// TipJar/backend/src/users/users.service.ts
import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
// Poprawiony import PrismaService
import { PrismaService } from '../prisma/prisma.service';
// Poprawiony import typów Prisma i dodanie PrismaClientKnownRequestError
import { 
    User, 
    Prisma, // Potrzebne dla np. Prisma.UserCreateInput
    UserRole, 
    SocialConnection
} from '../../generated/prisma'; // Zakładając, że klient jest w backend/generated/prisma
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
// Definicja DTO dla tworzenia użytkownika, używana wewnętrznie przez AuthService
// Upewnij się, że jest wyeksportowana, aby AuthService mógł jej używać.
export interface InternalCreateUserDto {
  email?: string | null;
  password?: string; 
  displayName: string; // Zakładamy, że displayName jest zawsze dostarczane przy tworzeniu
  avatarUrl?: string;
  role?: UserRole;
  isEmailVerified?: boolean;
  provider?: string;
  providerId?: string;
}

// Definicja DTO dla aktualizacji danych użytkownika
export interface InternalUpdateUserDto {
  displayName?: string;
  avatarUrl?: string;
  email?: string; 
  password?: string; // Nowe, zhashowane hasło
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

    this.logger.log(`Attempting to create user. Email: [${userEmail || 'N/A'}], Provider: [${provider || 'N/A'}]`);

    if (userEmail) {
      const existingUserByEmail = await this.prisma.user.findUnique({
        where: { email: userEmail },
      });
      if (existingUserByEmail) {
        this.logger.warn(`User creation failed: Email [${userEmail}] already exists for user ID [${existingUserByEmail.id}].`);
        throw new ConflictException(`Użytkownik z adresem email ${userEmail} już istnieje.`);
      }
    }

    if (provider && providerId) {
      const existingSocialConnection = await this.prisma.socialConnection.findUnique({
        where: { provider_providerId: { provider, providerId } },
      });
      if (existingSocialConnection) {
        this.logger.warn(`User creation failed: Social connection [${provider}: ${providerId.substring(0,10)}...] is already linked to user ID [${existingSocialConnection.userId}].`);
        throw new ConflictException(`To konto ${provider} jest już powiązane z innym użytkownikiem.`);
      }
    }

    try {
      const createPayload: Prisma.UserCreateInput = { // Użycie Prisma.UserCreateInput jest poprawne
        ...userData,
        email: userEmail,
        role: userData.role || UserRole.FAN,
        isEmailVerified: userData.isEmailVerified === undefined 
            ? (!!userEmail && provider !== 'siwe' && provider !== undefined) 
            : userData.isEmailVerified,
        socialConnections: (provider && providerId) ? {
          create: [{
            provider: provider,
            providerId: providerId,
          }],
        } : undefined,
      };

      const user = await this.prisma.user.create({
        data: createPayload,
        include: { socialConnections: true },
      });

      this.logger.log(`User (ID: ${user.id}, Email: ${user.email || 'N/A'}) created successfully.`);
      if (user.socialConnections && user.socialConnections.length > 0) {
        this.logger.log(`Associated social connection [${user.socialConnections[0].provider}: ${user.socialConnections[0].providerId.substring(0,10)}...] created for user ID ${user.id}.`);
      }
      return user;

    } catch (error) {
      this.logger.error(`Failed to create user (Email: ${userEmail || 'N/A'}): ${error.message}`, error.stack);
      // Poprawione sprawdzanie błędu Prisma
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const target = (error.meta?.target as string[])?.join(', ');
          this.logger.warn(`Prisma unique constraint violation on: ${target}`);
          throw new ConflictException(`Użytkownik z tymi danymi (${target || 'unikalne pole'}) już istnieje.`);
        }
      }
      throw new InternalServerErrorException('Wystąpił nieoczekiwany błąd podczas tworzenia użytkownika.');
    }
  }

  async findOneById(id: string): Promise<User | null> {
    this.logger.debug(`Finding user by ID: ${id}`);
    const user = await this.prisma.user.findUnique({
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
    const user = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: { socialConnections: true, profile: true },
    });
    if (!user) this.logger.warn(`User with email [${normalizedEmail}] not found.`);
    return user;
  }

  async updateUser(id: string, data: InternalUpdateUserDto): Promise<User> {
    this.logger.log(`Attempting to update user ID: ${id} with data: ${JSON.stringify(Object.keys(data))}`);
    try {
      if (data.email) {
        data.email = data.email.toLowerCase();
      }

      const user = await this.prisma.user.update({
        where: { id },
        data,
      });
      this.logger.log(`User ID [${id}] updated successfully.`);
      return user;
    } catch (error) {
      this.logger.error(`Failed to update user ID [${id}]: ${error.message}`, error.stack);
      // Poprawione sprawdzanie błędu Prisma
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          this.logger.warn(`Update failed: User ID [${id}] not found.`);
          throw new NotFoundException(`Użytkownik o ID ${id} nie został znaleziony.`);
        }
        if (error.code === 'P2002') {
            const target = (error.meta?.target as string[])?.join(', ');
            this.logger.warn(`Update failed for user ID [${id}]: Unique constraint violation on ${target}.`);
            throw new ConflictException(`Nie można zaktualizować użytkownika. Wartość dla ${target} jest już zajęta.`);
        }
      }
      throw new InternalServerErrorException('Wystąpił nieoczekiwany błąd podczas aktualizacji użytkownika.');
    }
  }

  async findByEmailVerificationToken(token: string): Promise<User | null> {
    this.logger.debug(`Finding user by email verification token (prefix): ${token.substring(0,10)}...`);
    const user = await this.prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
        // Opcjonalnie: sprawdzenie daty wygaśnięcia tokena
        // emailVerificationTokenExpiresAt: { gte: new Date() },
      },
    });
    if (!user) this.logger.warn(`No active user found for email verification token (prefix): ${token.substring(0,10)}...`);
    return user;
  }

  async findSocialConnection(provider: string, providerId: string): Promise<(SocialConnection & { user: User }) | null> {
    this.logger.debug(`Finding social connection for provider [${provider}] and provider ID (prefix) [${providerId.substring(0,10)}...]`);
    const socialConnection = await this.prisma.socialConnection.findUnique({
      where: {
        provider_providerId: { provider, providerId },
      },
      include: {
        user: true,
      },
    });
    if (!socialConnection) this.logger.warn(`Social connection for provider [${provider}] and provider ID (prefix) [${providerId.substring(0,10)}...] not found.`);
    return socialConnection;
  }

  async addSocialConnection(userId: string, provider: string, providerId: string): Promise<User> {
    this.logger.log(`Attempting to add social connection [${provider}: ${providerId.substring(0,10)}...] to user ID [${userId}]`);

    const userExists = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      this.logger.error(`Cannot add social connection: User ID [${userId}] not found.`);
      throw new NotFoundException(`Użytkownik o ID ${userId} nie został znaleziony.`);
    }

    const existingConnection = await this.prisma.socialConnection.findUnique({
        where: { provider_providerId: { provider, providerId } },
        select: { userId: true }
    });

    if (existingConnection && existingConnection.userId !== userId) {
        this.logger.warn(`Social connection [${provider}: ${providerId.substring(0,10)}...] already exists and is linked to a different user ID [${existingConnection.userId}].`);
        throw new ConflictException(`To konto ${provider} jest już powiązane z innym użytkownikiem TipJar.`);
    }
    if (existingConnection && existingConnection.userId === userId) {
        // Poprawka: this.logger.info na this.logger.log
        this.logger.log(`Social connection [${provider}: ${providerId.substring(0,10)}...] already exists for user ID [${userId}]. No action needed.`);
        // Zwracamy pełne dane użytkownika, upewniając się, że typ jest poprawny
        const userWithConnections = await this.findOneById(userId);
        if (!userWithConnections) { // Mało prawdopodobne, ale dla bezpieczeństwa
            throw new NotFoundException(`Użytkownik o ID ${userId} nie został znaleziony po ponownym sprawdzeniu.`);
        }
        return userWithConnections;
    }

    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: {
          socialConnections: {
            create: [{ provider, providerId }],
          },
        },
        include: { socialConnections: true },
      });
      this.logger.log(`Social connection [${provider}: ${providerId.substring(0,10)}...] successfully added to user ID [${userId}].`);
      return updatedUser;
    } catch (error) {
      this.logger.error(`Failed to add social connection for user ID [${userId}]: ${error.message}`, error.stack);
      // Poprawione sprawdzanie błędu Prisma
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
         throw new ConflictException('To połączenie społeczne już istnieje lub wystąpił inny konflikt unikalności.');
      }
      throw new InternalServerErrorException('Wystąpił błąd podczas dodawania połączenia społecznego.');
    }
  }
}
