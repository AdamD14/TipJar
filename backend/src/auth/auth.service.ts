import {
  Injectable,
  Logger,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';

import {
  UsersService,
  InternalCreateUserDto,
  InternalUpdateUserDto,
} from '../users/users.service';
import { CircleService } from '../circle/circle.service';

import { User as UserModelPrisma, UserRole, Prisma } from '@prisma/client';

import { RegisterUserDto } from './dto/register-user.dto';

export interface ValidatedUser {
  id: string;
  email: string | null;
  role: UserRole;
  displayName: string;
  avatarUrl?: string | null;
  isEmailVerified: boolean;
  isActive: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(forwardRef(() => CircleService))
    private circleService: CircleService,
    private mailerService: MailerService,
  ) {}

  private toValidatedUser(user: UserModelPrisma): ValidatedUser {
    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      role: user.role,
      isEmailVerified: user.isEmailVerified,
      isActive: user.isActive,
    };
  }

  private async generateTokens(user: ValidatedUser): Promise<AuthTokens> {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      displayName: user.displayName,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
        '15m',
      ),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
        '7d',
      ),
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    const updateData: InternalUpdateUserDto = {
      currentHashedRefreshToken: hashedRefreshToken,
    };
    await this.usersService.updateUser(user.id, updateData);

    this.logger.log(`Generated new tokens for user ID: ${user.id}`);
    return { accessToken, refreshToken };
  }

  async registerUser(registerDto: RegisterUserDto): Promise<ValidatedUser> {
    this.logger.log(
      `Attempting to register new user with email: ${registerDto.email}`,
    );

    const existingUser: UserModelPrisma | null =
      await this.usersService.findOneByEmail(registerDto.email.toLowerCase());
    if (existingUser) {
      throw new ConflictException(
        'Użytkownik o tym adresie email już istnieje.',
      );
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const createUserData: InternalCreateUserDto = {
      email: registerDto.email.toLowerCase(),
      password: hashedPassword,
      displayName: registerDto.email.split('@')[0],
      role: registerDto.role
        ? UserRole[registerDto.role.toUpperCase() as keyof typeof UserRole]
        : UserRole.FAN,
      isEmailVerified: false,
      isActive: true,
    };

    try {
      const newUserFromDb: UserModelPrisma =
        await this.usersService.createUser(createUserData);
      this.logger.log(
        `User ${newUserFromDb.email} (ID: ${newUserFromDb.id}) registered successfully. Initiating post-registration actions.`,
      );

      this.circleService
        .provisionUserWallet(
          newUserFromDb.id,
          newUserFromDb.email,
          newUserFromDb.role,
        )
        .then(() =>
          this.logger.log(
            `Circle Wallet provisioning successfully initiated for user ID ${newUserFromDb.id}`,
          ),
        )
        .catch((circleError: Error) =>
          this.logger.error(
            `Failed to initiate Circle Wallet provisioning for user ${newUserFromDb.id}: ${circleError.message}`,
            circleError.stack,
          ),
        );

      if (newUserFromDb.email) {
        this.sendVerificationEmail(newUserFromDb)
          .then(() =>
            this.logger.log(
              `Verification email dispatch initiated for ${newUserFromDb.email}`,
            ),
          )
          .catch((emailError: Error) =>
            this.logger.error(
              `Failed to dispatch verification email to ${newUserFromDb.email}: ${emailError.message}`,
              emailError.stack,
            ),
          );
      }

      return this.toValidatedUser(newUserFromDb);
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'Użytkownik o tym adresie email już istnieje.',
        );
      }
      if (error instanceof ConflictException) {
        throw error;
      }
      this.logger.error(
        `Critical error during registration for email ${registerDto.email}: ${
          (error as Error).message
        }`,
        (error as Error).stack,
      );
      throw new InternalServerErrorException(
        'Rejestracja nie powiodła się z powodu wewnętrznego błędu serwera.',
      );
    }
  }

  async login(user: ValidatedUser): Promise<AuthTokens> {
    this.logger.log(
      `Login successful for user: ${
        user.email || `ID ${user.id}`
      }. Generating tokens.`,
    );
    return this.generateTokens(user);
  }

  async validateUserByPassword(
    email: string,
    pass: string,
  ): Promise<ValidatedUser | null> {
    this.logger.debug(`Validating user by password for email: ${email}`);
    const userFromDb: UserModelPrisma | null =
      await this.usersService.findOneByEmail(email.toLowerCase());

    if (
      userFromDb &&
      userFromDb.password &&
      (await bcrypt.compare(pass, userFromDb.password))
    ) {
      this.logger.log(
        `User ${email} (ID: ${userFromDb.id}) validated successfully by password.`,
      );
      return this.toValidatedUser(userFromDb);
    }
    this.logger.warn(`Invalid credentials provided for email: ${email}`);
    return null;
  }

  async validateOAuthUser(
    provider: 'google' | 'twitch', // Usunięto 'siwe'
    providerId: string,
    email: string | null,
    displayName: string,
    avatarUrl: string | undefined,
    role: UserRole,
  ): Promise<ValidatedUser> {
    this.logger.debug(
      `Validating OAuth user. Provider: ${provider}, Provider ID (prefix): ${providerId.substring(
        0,
        10,
      )}...`,
    );

    const socialConnection = await this.usersService.findSocialConnection(
      provider,
      providerId,
    );
    let userFromDb: UserModelPrisma;

    if (socialConnection) {
      this.logger.log(
        `Found existing user (ID: ${
          socialConnection.user.id
        }) via social connection [${provider}: ${providerId.substring(
          0,
          10,
        )}...].`,
      );
      userFromDb = socialConnection.user;
    } else {
      let existingUserByEmail: UserModelPrisma | null = null;
      if (email) {
        existingUserByEmail = await this.usersService.findOneByEmail(
          email.toLowerCase(),
        );
      }

      if (existingUserByEmail) {
        this.logger.log(
          `Existing user found by email [${email}]. Linking [${provider}] social connection to user ID [${existingUserByEmail.id}].`,
        );
        userFromDb = await this.usersService.addSocialConnection(
          existingUserByEmail.id,
          provider,
          providerId,
        );
      } else {
        this.logger.log(
          `No existing user found by provider ID or email. Creating new user for [${provider}]: ${displayName}.`,
        );
        const createUserData: InternalCreateUserDto = {
          email: email ? email.toLowerCase() : null,
          displayName: displayName,
          avatarUrl: avatarUrl,
          role: role,
          provider: provider,
          providerId: providerId,
          isEmailVerified: !!email, // Uproszczona logika bez SIWE
          isActive: true,
        };
        userFromDb = await this.usersService.createUser(createUserData);
        this.logger.log(
          `New user (ID: ${userFromDb.id}) created successfully via ${provider}. Initiating post-registration actions.`,
        );

        this.circleService
          .provisionUserWallet(userFromDb.id, userFromDb.email, userFromDb.role)
          .then(() =>
            this.logger.log(
              `Circle Wallet provisioning successfully initiated for new OAuth user ID ${userFromDb.id}`,
            ),
          )
          .catch((circleError: Error) =>
            this.logger.error(
              `Failed to initiate Circle Wallet provisioning for new OAuth user ${userFromDb.id}: ${circleError.message}`,
              circleError.stack,
            ),
          );
      }
    }
    return this.toValidatedUser(userFromDb);
  }

  async refreshToken(
    userId: string,
    currentRefreshToken: string,
  ): Promise<AuthTokens> {
    this.logger.debug(`Attempting to refresh tokens for user ID: ${userId}`);
    const userFromDb: UserModelPrisma | null =
      await this.usersService.findOneById(userId);

    if (!userFromDb || !userFromDb.currentHashedRefreshToken) {
      throw new UnauthorizedException('Dostęp zabroniony.');
    }

    const isRefreshTokenMatching = await bcrypt.compare(
      currentRefreshToken,
      userFromDb.currentHashedRefreshToken,
    );
    if (!isRefreshTokenMatching) {
      throw new UnauthorizedException('Dostęp zabroniony.');
    }

    const validatedUser = this.toValidatedUser(userFromDb);
    return this.generateTokens(validatedUser);
  }

  async sendVerificationEmail(user: UserModelPrisma): Promise<void> {
    if (!user.email) {
      this.logger.warn(
        `Cannot send verification email: User ID ${user.id} has no email address defined.`,
      );
      return;
    }
    if (user.isEmailVerified) {
      this.logger.log(
        `Email ${user.email} is already verified for user ID ${user.id}. Skipping verification email.`,
      );
      return;
    }

    const verificationToken = randomUUID();
    const updateDto: InternalUpdateUserDto = {
      emailVerificationToken: verificationToken,
      isEmailVerified: false,
    };

    await this.usersService.updateUser(user.id, updateDto);

    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    const verificationUrl = `${frontendUrl}/auth/verify-email?token=${verificationToken}`;

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: `TipJar - Zweryfikuj swój adres email`,
        html: `
                      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                          <h2>Witaj ${user.displayName || user.email}!</h2>
                          <p>Dziękujemy za korzystanie z TipJar! Aby zweryfikować swój adres email, kliknij poniższy link:</p>
                          <p style="text-align: center;">
                              <a href="${verificationUrl}" target="_blank" style="background-color: #FFD700; color: #006D6D; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                                  Zweryfikuj Mój Adres Email
                              </a>
                          </p>
                          <p>Jeśli przycisk nie działa, skopiuj i wklej poniższy link do przeglądarki:</p>
                          <p><a href="${verificationUrl}" target="_blank">${verificationUrl}</a></p>
                      </div>`,
      });
      this.logger.log(
        `Verification email successfully sent to ${user.email} (User ID: ${user.id}).`,
      );
    } catch (error: unknown) {
      this.logger.error(
        `Failed to send verification email to ${user.email} (User ID: ${
          user.id
        }): ${(error as Error).message}`,
        (error as Error).stack,
      );
    }
  }

  async verifyEmailToken(token: string): Promise<UserModelPrisma> {
    this.logger.log(
      `Attempting to verify email with token (prefix): ${token.substring(
        0,
        10,
      )}...`,
    );
    const userFromDb: UserModelPrisma | null =
      await this.usersService.findByEmailVerificationToken(token);

    if (!userFromDb) {
      throw new BadRequestException(
        'Token weryfikacyjny jest nieprawidłowy lub wygasł.',
      );
    }
    if (userFromDb.isEmailVerified) {
      return userFromDb;
    }

    const updateData: InternalUpdateUserDto = {
      isEmailVerified: true,
      emailVerificationToken: null,
      isActive: true,
    };
    const updatedUser: UserModelPrisma = await this.usersService.updateUser(
      userFromDb.id,
      updateData,
    );
    this.logger.log(
      `Email for user ${userFromDb.email} (ID: ${userFromDb.id}) has been successfully verified.`,
    );
    return updatedUser;
  }

  async logout(userId: string): Promise<void> {
    this.logger.log(
      `User logout requested for ID: ${userId}. Clearing stored refresh token.`,
    );
    await this.usersService.updateUser(userId, {
      currentHashedRefreshToken: null,
    });
    this.logger.log(`Stored refresh token cleared for user ID: ${userId}.`);
  }
}
