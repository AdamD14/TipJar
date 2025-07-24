import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma, UserRole, SocialConnection } from '@prisma/client';
import { SetUsernameDto } from '../auth/dto/set-username.dto';

// Używamy klas dla DTO, aby były zgodne ze standardami NestJS
export class InternalCreateUserDto {
  email?: string | null;
  password?: string;
  displayName: string;
  avatarUrl?: string;
  role?: UserRole;
  isEmailVerified?: boolean;
  provider?: string;
  providerId?: string;
  isActive?: boolean;
}

export class InternalUpdateUserDto {
  displayName?: string;
  avatarUrl?: string;
  email?: string;
  password?: string;
  isEmailVerified?: boolean;
  emailVerificationToken?: string | null;
  emailVerificationTokenExpiresAt?: Date | null;
  currentHashedRefreshToken?: string | null;
  isActive?: boolean;
  role?: UserRole;
  circleWalletId?: string | null;
  mainWalletAddress?: string | null;
  isCircleSetupComplete?: boolean;
}

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {}

  async createUser(data: InternalCreateUserDto): Promise<User> {
    const { provider, providerId, ...userData } = data;
    const userEmail = userData.email ? userData.email.toLowerCase() : null;

    this.logger.log(
      `Attempting to create user. Email: [${
        userEmail || 'N/A'
      }], Provider: [${provider || 'N/A'}]`,
    );

    if (userEmail) {
      const existingUserByEmail: User | null =
        await this.prisma.user.findUnique({
          where: { email: userEmail },
        });
      if (existingUserByEmail) {
        this.logger.warn(
          `User creation failed: Email [${userEmail}] already exists for user ID [${existingUserByEmail.id}].`,
        );
        throw new ConflictException(
          `Użytkownik z adresem email ${userEmail} już istnieje.`,
        );
      }
    }

    if (provider && providerId) {
      const existingSocialConnection: SocialConnection | null =
        await this.prisma.socialConnection.findUnique({
          where: { provider_providerId: { provider, providerId } },
        });
      if (existingSocialConnection) {
        this.logger.warn(
          `User creation failed: Social connection [${provider}: ${providerId.substring(
            0,
            10,
          )}...] is already linked to user ID [${
            existingSocialConnection.userId
          }].`,
        );
        throw new ConflictException(
          `To konto ${provider} jest już powiązane z innym użytkownikiem.`,
        );
      }
    }

    try {
      const createPayload: Prisma.UserCreateInput = {
        ...userData,
        email: userEmail,
        role: userData.role || UserRole.FAN,
        isEmailVerified:
          userData.isEmailVerified === undefined
            ? !!userEmail && provider !== undefined
            : userData.isEmailVerified,
        socialConnections:
          provider && providerId
            ? {
                create: [
                  {
                    provider: provider,
                    providerId: providerId,
                  },
                ],
              }
            : undefined,
      };

      const user: User & { socialConnections: SocialConnection[] } =
        await this.prisma.user.create({
          data: createPayload,
          include: { socialConnections: true },
        });

      this.logger.log(
        `User (ID: ${user.id}, Email: ${
          user.email || 'N/A'
        }) created successfully.`,
      );
      if (user.socialConnections && user.socialConnections.length > 0) {
        this.logger.log(
          `Associated social connection [${
            user.socialConnections[0].provider
          }: ${user.socialConnections[0].providerId.substring(
            0,
            10,
          )}...] created for user ID ${user.id}.`,
        );
      }
      return user;
    } catch (error: unknown) {
      this.logger.error(
        `Failed to create user (Email: ${userEmail || 'N/A'}): ${(error as Error).message}`,
        (error as Error).stack,
      );
      if (error instanceof Error && 'code' in error && typeof error.code === 'string' && error.code === 'P2002') {
        const target = (error as any).meta?.target?.join(', ');
        this.logger.warn(`Prisma unique constraint violation on: ${target}`);
        throw new ConflictException(
          `Użytkownik z tymi danymi (${target || 'unikalne pole'}) już istnieje.`,
        );
      }
      throw new InternalServerErrorException(
        'Wystąpił nieoczekiwany błąd podczas tworzenia użytkownika.',
      );
    }
  }

  async findOneById(id: string): Promise<User | null> {
    this.logger.debug(`Finding user by ID: ${id}`);
    const user: User | null = await this.prisma.user.findUnique({
      where: { id },
      include: {
        socialConnections: true,
        profile: true,
      },
    });
    if (!user) this.logger.warn(`User with ID [${id}] not found.`);
    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    if (!email) return null;
    const normalizedEmail = email.toLowerCase();
    this.logger.debug(`Finding user by email: ${normalizedEmail}`);
    const user: User | null = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: { socialConnections: true, profile: true },
    });
    if (!user)
      this.logger.warn(`User with email [${normalizedEmail}] not found.`);
    return user;
  }

  async updateUser(id: string, data: InternalUpdateUserDto): Promise<User> {
    this.logger.log(
      `Attempting to update user ID: ${id} with data: ${JSON.stringify(
        Object.keys(data),
      )}`,
    );
    try {
      if (data.email) {
        data.email = data.email.toLowerCase();
      }

      const user: User = await this.prisma.user.update({
        where: { id },
        data,
      });
      this.logger.log(`User ID [${id}] updated successfully.`);
      return user;
    } catch (error: unknown) {
      this.logger.error(
        `Failed to update user ID [${id}]: ${(error as Error).message}`,
        (error as Error).stack,
      );
      if (error instanceof Error && 'code' in error && typeof error.code === 'string') {
        if (error.code === 'P2025') {
          this.logger.warn(`Update failed: User ID [${id}] not found.`);
          throw new NotFoundException(
            `Użytkownik o ID ${id} nie został znaleziony.`,
          );
        } else if (error.code === 'P2002') {
          const target = (error as any).meta?.target?.join(', ');
          this.logger.warn(
            `Update failed for user ID [${id}]: Unique constraint violation on ${target}.`,
          );
          throw new ConflictException(
            `Nie można zaktualizować użytkownika. Wartość dla ${target} jest już zajęta.`,
          );
        }
      }
      throw new InternalServerErrorException(
        'Wystąpił nieoczekiwany błąd podczas aktualizacji użytkownika.',
      );
    }
  }

  async findByEmailVerificationToken(token: string): Promise<User | null> {
    this.logger.debug(
      `Finding user by email verification token (prefix): ${token.substring(
        0,
        10,
      )}...`,
    );
    const user: User | null = await this.prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
      },
    });
    if (!user)
      this.logger.warn(
        `No active user found for email verification token (prefix): ${token.substring(
          0,
          10,
        )}...`,
      );
    return user;
  }

  async findSocialConnection(
    provider: string,
    providerId: string,
  ): Promise<(SocialConnection & { user: User }) | null> {
    this.logger.debug(
      `Finding social connection for provider [${provider}] and provider ID (prefix) [${providerId.substring(
        0,
        10,
      )}]...`,
    );
    const socialConnection: (SocialConnection & { user: User }) | null =
      await this.prisma.socialConnection.findUnique({
        where: {
          provider_providerId: { provider, providerId },
        },
        include: {
          user: true,
        },
      });
    if (!socialConnection)
      this.logger.warn(
        `Social connection for provider [${provider}] and provider ID (prefix) [${providerId.substring(
          0,
          10,
        )}]... not found.`,
      );
    return socialConnection;
  }

  async addSocialConnection(
    userId: string,
    provider: string,
    providerId: string,
  ): Promise<User> {
    this.logger.log(
      `Attempting to add social connection [${provider}: ${providerId.substring(
        0,
        10,
      )}...] to user ID [${userId}]`,
    );

    const userExists: User | null = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) {
      this.logger.error(
        `Cannot add social connection: User ID [${userId}] not found.`,
      );
      throw new NotFoundException(
        `Użytkownik o ID ${userId} nie został znaleziony.`,
      );
    }

    const existingConnection: { userId: string } | null =
      await this.prisma.socialConnection.findUnique({
        where: { provider_providerId: { provider, providerId } },
        select: { userId: true },
      });

    if (existingConnection && existingConnection.userId !== userId) {
      this.logger.warn(
        `Social connection [${provider}: ${providerId.substring(
          0,
          10,
        )}...] already exists and is linked to a different user ID [${
          existingConnection.userId
        }].`,
      );
      throw new ConflictException(
        `To konto ${provider} jest już powiązane z innym użytkownikiem TipJar.`,
      );
    }
    if (existingConnection && existingConnection.userId === userId) {
      this.logger.log(
        `Social connection [${provider}: ${providerId.substring(
          0,
          10,
        )}...] already exists for user ID [${userId}]. No action needed.`,
      );
      const userWithConnections = await this.findOneById(userId);
      if (!userWithConnections) {
        throw new NotFoundException(
          `Użytkownik o ID ${userId} nie został znaleziony po ponownym sprawdzeniu.`,
        );
      }
      return userWithConnections;
    }

    try {
      const updatedUser: User = await this.prisma.user.update({
        where: { id: userId },
        data: {
          socialConnections: {
            create: [{ provider, providerId }],
          },
        },
        include: { socialConnections: true },
      });
      this.logger.log(
        `Social connection [${provider}: ${providerId.substring(
          0,
          10,
        )}...] successfully added to user ID [${userId}].`,
      );
      return updatedUser;
    } catch (error: unknown) {
      this.logger.error(
        `Failed to add social connection for user ID [${userId}]: ${(error as Error).message}`,
        (error as Error).stack,
      );
      if (error instanceof Error && 'code' in error && typeof error.code === 'string' && error.code === 'P2002') {
        throw new ConflictException(
          'To połączenie społeczne już istnieje lub wystąpił inny konflikt unikalności.',
        );
      }
      throw new InternalServerErrorException(
        'Wystąpił błąd podczas dodawania połączenia społecznego.',
      );
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username: username.toLowerCase() },
    });
  }

  async setUsernameAndConsents(
    userId: string,
    data: SetUsernameDto,
  ): Promise<User> {
    const user: User | null = await this.findOneById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingUsername: User | null = await this.findByUsername(
      data.username,
    );
    if (existingUsername && existingUsername.id !== userId) {
      throw new ConflictException('Username is already taken');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        username: data.username.toLowerCase(),
        consents: data.consents as any,
        hasCompletedOnboarding: true,
      },
    });
  }
}
