// TipJar/backend/src/auth/auth.service.ts
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
import { SiweMessage } from 'siwe';
import { MailerService } from '@nestjs-modules/mailer';
import type { RedisClientType } from 'redis';

import { UsersService, InternalCreateUserDto, InternalUpdateUserDto } from '../users/users.service';
import { CircleService } from '../circle/circle.service';

// Poprawiony import Prisma - dostosuj '../../generated/prisma' do swojej struktury, jeśli potrzeba
import { User as UserModelPrisma, UserRole, Prisma } from '../../generated/prisma';

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
  private readonly SIWE_NONCE_TTL_SECONDS = 300; // 5 minut

  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(forwardRef(() => CircleService))
    private circleService: CircleService,
    private mailerService: MailerService,
    @Inject('REDIS_CLIENT') private redisClient: RedisClientType,
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
      expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION_TIME', '15m'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME', '7d'),
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    const updateData: InternalUpdateUserDto = { currentHashedRefreshToken: hashedRefreshToken };
    await this.usersService.updateUser(user.id, updateData);

    this.logger.log(`Generated new tokens for user ID: ${user.id}`);
    return { accessToken, refreshToken };
  }

  async registerUser(registerDto: any /* TODO: Zastąp przez RegisterUserDto */): Promise<ValidatedUser> {
    this.logger.log(`Attempting to register new user with email: ${registerDto.email}`);
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const createUserData: InternalCreateUserDto = {
      email: registerDto.email.toLowerCase(),
      password: hashedPassword,
      displayName: registerDto.displayName,
      role: registerDto.role || UserRole.FAN,
      isEmailVerified: false,
    };

    try {
      const newUserFromDb = await this.usersService.createUser(createUserData);
      this.logger.log(`User ${newUserFromDb.email} (ID: ${newUserFromDb.id}) registered successfully. Initiating post-registration actions.`);

      this.circleService.provisionUserWallet(newUserFromDb.id, newUserFromDb.email, newUserFromDb.role)
        .then(() => this.logger.log(`Circle Wallet provisioning successfully initiated for user ID ${newUserFromDb.id}`))
        .catch(circleError => this.logger.error(`Failed to initiate Circle Wallet provisioning for user ${newUserFromDb.id}: ${circleError.message}`, circleError.stack));
      
      if (newUserFromDb.email) {
        this.sendVerificationEmail(newUserFromDb)
          .then(() => this.logger.log(`Verification email dispatch initiated for ${newUserFromDb.email}`))
          .catch(emailError => this.logger.error(`Failed to dispatch verification email to ${newUserFromDb.email}: ${emailError.message}`, emailError.stack));
      }
      
      return this.toValidatedUser(newUserFromDb);

    } catch (error) {
      if (error instanceof ConflictException) {
        this.logger.warn(`Registration failed: Email ${registerDto.email} already exists.`);
        throw error;
      }
      this.logger.error(`Critical error during registration for email ${registerDto.email}: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Rejestracja nie powiodła się z powodu wewnętrznego błędu serwera.');
    }
  }

  async login(user: ValidatedUser): Promise<AuthTokens> {
    if (user.email && !user.isEmailVerified) {
        this.logger.warn(`Login attempt for unverified email: ${user.email}. User ID: ${user.id}`);
    }
    this.logger.log(`Login successful for user: ${user.email || `ID ${user.id}`}. Generating tokens.`);
    return this.generateTokens(user);
  }

  async validateUserByPassword(email: string, pass: string): Promise<ValidatedUser | null> {
    this.logger.debug(`Validating user by password for email: ${email}`);
    const userFromDb = await this.usersService.findOneByEmail(email.toLowerCase());

    if (userFromDb && userFromDb.password && (await bcrypt.compare(pass, userFromDb.password))) {
      this.logger.log(`User ${email} (ID: ${userFromDb.id}) validated successfully by password.`);
      return this.toValidatedUser(userFromDb);
    }
    this.logger.warn(`Invalid credentials provided for email: ${email}`);
    return null;
  }

  async validateOAuthUser(
    provider: 'google' | 'twitch' | 'siwe',
    providerId: string,
    email: string | null,
    displayName: string,
    avatarUrl?: string,
  ): Promise<ValidatedUser> {
    this.logger.debug(`Validating OAuth/SIWE user. Provider: ${provider}, Provider ID (prefix): ${providerId.substring(0,10)}...`);
    
    const socialConnection = await this.usersService.findSocialConnection(provider, providerId);
    let userFromDb: UserModelPrisma;

    if (socialConnection) {
      this.logger.log(`Found existing user (ID: ${socialConnection.user.id}) via social connection [${provider}: ${providerId.substring(0,10)}...].`);
      userFromDb = socialConnection.user;
    } else {
      let existingUserByEmail: UserModelPrisma | null = null;
      if (email) {
        existingUserByEmail = await this.usersService.findOneByEmail(email.toLowerCase());
      }

      if (existingUserByEmail) {
        this.logger.log(`Existing user found by email [${email}]. Linking [${provider}] social connection to user ID [${existingUserByEmail.id}].`);
        userFromDb = await this.usersService.addSocialConnection(existingUserByEmail.id, provider, providerId);
      } else {
        this.logger.log(`No existing user found by provider ID or email. Creating new user for [${provider}]: ${displayName}.`);
        const createUserData: InternalCreateUserDto = {
          email: email ? email.toLowerCase() : null,
          displayName: displayName,
          avatarUrl: avatarUrl,
          role: UserRole.FAN,
          provider: provider,
          providerId: providerId,
          isEmailVerified: provider !== 'siwe' && !!email,
        };
        userFromDb = await this.usersService.createUser(createUserData);
        this.logger.log(`New user (ID: ${userFromDb.id}) created successfully via ${provider}. Initiating post-registration actions.`);

        this.circleService.provisionUserWallet(userFromDb.id, userFromDb.email, userFromDb.role)
            .then(() => this.logger.log(`Circle Wallet provisioning successfully initiated for new OAuth/SIWE user ID ${userFromDb.id}`))
            .catch(circleError => this.logger.error(`Failed to initiate Circle Wallet provisioning for new OAuth/SIWE user ${userFromDb.id}: ${circleError.message}`, circleError.stack));
        
        if (userFromDb.email && !userFromDb.isEmailVerified) {
            this.sendVerificationEmail(userFromDb)
                .then(() => this.logger.log(`Verification email dispatch initiated for new OAuth/SIWE user ${userFromDb.email} as it was not auto-verified.`))
                .catch(emailError => this.logger.error(`Failed to dispatch verification email to new OAuth/SIWE user ${userFromDb.email}: ${emailError.message}`, emailError.stack));
        }
      }
    }
    return this.toValidatedUser(userFromDb);
  }
  
  async refreshToken(userId: string, currentRefreshToken: string): Promise<AuthTokens> {
    this.logger.debug(`Attempting to refresh tokens for user ID: ${userId}`);
    const userFromDb = await this.usersService.findOneById(userId);

    if (!userFromDb || !userFromDb.currentHashedRefreshToken) {
      this.logger.warn(`Refresh token validation failed: User ${userId} not found or has no stored refresh token.`);
      throw new UnauthorizedException('Dostęp zabroniony.');
    }
    
    const isRefreshTokenMatching = await bcrypt.compare(currentRefreshToken, userFromDb.currentHashedRefreshToken);
    if (!isRefreshTokenMatching) {
      this.logger.warn(`Refresh token validation failed: Provided token does not match stored hash for user ${userId}.`);
      throw new UnauthorizedException('Dostęp zabroniony.');
    }
    
    const validatedUser = this.toValidatedUser(userFromDb);
    this.logger.log(`Refresh token validated for user ${userId}. Generating new access and refresh tokens.`);
    return this.generateTokens(validatedUser);
  }

  async generateSiweNonce(address: string): Promise<string> {
    const nonce = randomUUID();
    const redisKey = `siwe:nonce:${address.toLowerCase()}`;
    await this.redisClient.set(redisKey, nonce, { EX: this.SIWE_NONCE_TTL_SECONDS });
    this.logger.log(`Generated SIWE nonce for address ${address}: ${nonce}. Stored in Redis with key ${redisKey} (TTL: ${this.SIWE_NONCE_TTL_SECONDS}s).`);
    return nonce;
  }

  private async verifySiweNonceWithRedis(address: string, receivedNonce: string): Promise<boolean> {
    const redisKey = `siwe:nonce:${address.toLowerCase()}`;
    const storedNonce = await this.redisClient.get(redisKey);

    if (storedNonce === receivedNonce) {
      await this.redisClient.del(redisKey);
      this.logger.log(`SIWE nonce verified and deleted from Redis for address ${address}.`);
      return true;
    }
    this.logger.warn(`SIWE nonce verification failed for address ${address}. Received: [${receivedNonce}], Stored: [${storedNonce}]`);
    return false;
  }

  async verifySiweMessage(message: string, signature: string, addressFromRequest: string): Promise<string | null> {
    this.logger.debug(`Verifying SIWE message for address from request: ${addressFromRequest}`);
    try {
      const siweMessage = new SiweMessage(message);
      
      const nonceIsValid = await this.verifySiweNonceWithRedis(siweMessage.address.toLowerCase(), siweMessage.nonce);
      if (!nonceIsValid) {
        this.logger.warn(`SIWE nonce [${siweMessage.nonce}] invalid or expired for address from message [${siweMessage.address}].`);
        throw new BadRequestException('Nieprawidłowy lub wygasły nonce SIWE.');
      }

      const expectedDomain = this.configService.get<string>('FRONTEND_URL_DOMAIN_FOR_SIWE');
      const expectedOrigin = this.configService.get<string>('FRONTEND_URL'); 

      if (expectedDomain && siweMessage.domain !== expectedDomain) {
          this.logger.error(`SIWE domain mismatch. Expected: [${expectedDomain}], Got: [${siweMessage.domain}]`);
          throw new BadRequestException('Niezgodność domeny w wiadomości SIWE.');
      }
      if (siweMessage.uri && expectedOrigin && siweMessage.uri !== expectedOrigin) {
        this.logger.error(`SIWE URI mismatch. Expected: [${expectedOrigin}], Got: [${siweMessage.uri}]`);
        throw new BadRequestException('Niezgodność URI w wiadomości SIWE.');
      }

      const { data: verifiedData } = await siweMessage.verify({
        signature,
      });

      if (verifiedData.address.toLowerCase() !== addressFromRequest.toLowerCase()) {
          this.logger.error(`SIWE message address [${verifiedData.address}] does not match address from request [${addressFromRequest}]. Potential tampering.`);
          throw new BadRequestException('Adres w wiadomości SIWE nie zgadza się z adresem żądania.');
      }

      this.logger.log(`SIWE signature and message verified successfully for address: ${verifiedData.address}`);
      return verifiedData.address;

    } catch (error) {
      this.logger.error(`SIWE verification process failed: ${error.message}`, error.stack);
      if (error instanceof BadRequestException || error instanceof UnauthorizedException) throw error;
      throw new BadRequestException(`Weryfikacja wiadomości SIWE nie powiodła się: ${error.message}`);
    }
  }
  
  async sendVerificationEmail(user: UserModelPrisma): Promise<void> {
    if (!user.email) {
        this.logger.warn(`Cannot send verification email: User ID ${user.id} has no email address defined.`);
        return;
    }
    // ZMIANA: this.logger.info -> this.logger.log
    if (user.isEmailVerified && !process.env.ALLOW_RESEND_VERIFICATION_FOR_VERIFIED) {
        this.logger.log(`Email ${user.email} is already verified for user ID ${user.id}. Skipping verification email.`);
        return;
    }

    const verificationToken = randomUUID();
    const updateDto: InternalUpdateUserDto = { 
        emailVerificationToken: verificationToken,
    };
    if (!user.isEmailVerified) {
        updateDto.isEmailVerified = false;
    }

    await this.usersService.updateUser(user.id, updateDto);

    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    const verificationUrl = `${frontendUrl}/auth/verify-email?token=${verificationToken}`;
    
    this.logger.log(`Preparing to send verification email to ${user.email} for user ID ${user.id}. URL: ${verificationUrl}`);

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
                    <p>Link weryfikacyjny jest ważny przez ograniczony czas.</p>
                    <p>Jeśli nie prosiłeś/aś o weryfikację, zignoruj tę wiadomość.</p>
                    <hr>
                    <p>Pozdrawiamy serdecznie,<br>Zespół TipJar</p>
                </div>`,
        });
        this.logger.log(`Verification email successfully sent to ${user.email} (User ID: ${user.id}).`);
    } catch (error) {
        this.logger.error(`Failed to send verification email to ${user.email} (User ID: ${user.id}): ${error.message}`, error.stack);
    }
  }

  async verifyEmailToken(token: string): Promise<UserModelPrisma> {
    this.logger.log(`Attempting to verify email with token (prefix): ${token.substring(0, 10)}...`);
    const userFromDb = await this.usersService.findByEmailVerificationToken(token); 
    
    if (!userFromDb) {
      this.logger.warn(`Invalid or expired email verification token presented: ${token.substring(0, 10)}...`);
      throw new BadRequestException('Token weryfikacyjny jest nieprawidłowy lub wygasł. Spróbuj ponownie poprosić o link weryfikacyjny.');
    }
    if (userFromDb.isEmailVerified) {
        // ZMIANA: this.logger.info -> this.logger.log
        this.logger.log(`Email ${userFromDb.email} for user ID ${userFromDb.id} is already verified.`);
        return userFromDb; 
    }

    const updateData: InternalUpdateUserDto = { 
        isEmailVerified: true, 
        emailVerificationToken: null, 
        isActive: true, 
    };
    const updatedUser = await this.usersService.updateUser(userFromDb.id, updateData);
    this.logger.log(`Email for user ${userFromDb.email} (ID: ${userFromDb.id}) has been successfully verified.`);
    return updatedUser;
  }

  async logout(userId: string): Promise<void> {
    this.logger.log(`User logout requested for ID: ${userId}. Clearing stored refresh token.`);
    await this.usersService.updateUser(userId, { currentHashedRefreshToken: null });
    this.logger.log(`Stored refresh token cleared for user ID: ${userId}.`);
  }
}