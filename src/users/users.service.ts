// TipJar/backend/src/users/users.service.ts
import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma, UserRole, SocialConnection } from '@prisma/client'; // Importuj typy z Prisma Client

// Definicja DTO dla tworzenia użytkownika, używana wewnętrznie przez AuthService
// Upewnij się, że jest wyeksportowana, aby AuthService mógł jej używać.
export interface InternalCreateUserDto {
  email?: string | null; // Email jest opcjonalny (np. dla SIWE)
  password?: string;     // Zhashowane hasło, opcjonalne dla logowań OAuth/SIWE
  displayName: string;
  avatarUrl?: string;
  role?: UserRole;       // Domyślnie FAN, jeśli nie podano
  isEmailVerified?: boolean; // Czy email jest już zweryfikowany (np. przez OAuth)

  // Pola do automatycznego utworzenia SocialConnection przy tworzeniu użytkownika
  provider?: string;     // np. 'google', 'twitch', 'siwe'
  providerId?: string;   // ID od dostawcy lub adres portfela
}

// Definicja DTO dla aktualizacji danych użytkownika
export interface InternalUpdateUserDto {
  displayName?: string;
  avatarUrl?: string;
  email?: string; // Należy ostrożnie podchodzić do zmiany emaila, wymaga dodatkowej logiki weryfikacji
  password?: string; // Nowe, zhashowane hasło
  isEmailVerified?: boolean;
  emailVerificationToken?: string | null;
  emailVerificationTokenExpiresAt?: Date | null; // Opcjonalnie, jeśli implementujesz wygasanie tokenów weryfikacyjnych
  currentHashedRefreshToken?: string | null; // Do przechowywania hasha refresh tokena
  isActive?: boolean;
  role?: UserRole; // Ostrożnie ze zmianą roli
  circleWalletId?: string | null;
  mainWalletAddress?: string | null;
  isCircleSetupComplete?: boolean;
}

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Tworzy nowego użytkownika w bazie danych wraz z opcjonalnym pierwszym połączeniem społecznościowym.
   * @param data Dane nowego użytkownika z InternalCreateUserDto.
   * @returns Obietnica z obiektem utworzonego użytkownika.
   * @throws ConflictException jeśli email lub połączenie społecznościowe już istnieje.
   * @throws InternalServerErrorException przy innych błędach bazy danych.
   */
  async createUser(data: InternalCreateUserDto): Promise<User> {
    const { provider, providerId, ...userData } = data;
    const userEmail = userData.email ? userData.email.toLowerCase() : null;

    this.logger.log(`Attempting to create user. Email: [${userEmail || 'N/A'}], Provider: [${provider || 'N/A'}]`);

    // Sprawdzenie, czy email (jeśli podany) już istnieje
    if (userEmail) {
      const existingUserByEmail = await this.prisma.user.findUnique({
        where: { email: userEmail },
      });
      if (existingUserByEmail) {
        this.logger.warn(`User creation failed: Email [${userEmail}] already exists for user ID [${existingUserByEmail.id}].`);
        throw new ConflictException(`Użytkownik z adresem email ${userEmail} już istnieje.`);
      }
    }

    // Sprawdzenie, czy połączenie społecznościowe (jeśli podane) już istnieje
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
      const createPayload: Prisma.UserCreateInput = {
        ...userData,
        email: userEmail, // Znormalizowany email
        role: userData.role || UserRole.FAN, // Domyślnie FAN
        isEmailVerified: userData.isEmailVerified === undefined 
            ? (!!userEmail && provider !== 'siwe' && provider !== undefined) // Uznaj za zweryfikowany jeśli z OAuth i jest email
            : userData.isEmailVerified,
        // Jeśli provider i providerId są dostępne, tworzymy od razu SocialConnection
        socialConnections: (provider && providerId) ? {
          create: [{
            provider: provider,
            providerId: providerId,
          }],
        } : undefined,
      };

      const user = await this.prisma.user.create({
        data: createPayload,
        include: { socialConnections: true }, // Dołączamy utworzone połączenie
      });

      this.logger.log(`User (ID: ${user.id}, Email: ${user.email || 'N/A'}) created successfully.`);
      if (user.socialConnections && user.socialConnections.length > 0) {
        this.logger.log(`Associated social connection [${user.socialConnections[0].provider}: ${user.socialConnections[0].providerId.substring(0,10)}...] created for user ID ${user.id}.`);
      }
      return user;

    } catch (error) {
      this.logger.error(`Failed to create user (Email: ${userEmail || 'N/A'}): ${error.message}`, error.stack);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // P2002 to kod błędu dla naruszenia unikalnego ograniczenia (np. email, lub unikalny provider+providerId)
        if (error.code === 'P2002') {
          const target = (error.meta?.target as string[])?.join(', ');
          this.logger.warn(`Prisma unique constraint violation on: ${target}`);
          throw new ConflictException(`Użytkownik z tymi danymi (${target || 'unikalne pole'}) już istnieje.`);
        }
      }
      throw new InternalServerErrorException('Wystąpił nieoczekiwany błąd podczas tworzenia użytkownika.');
    }
  }

  /**
   * Znajduje użytkownika po jego unikalnym ID.
   * @param id ID użytkownika.
   * @returns Obietnica z obiektem użytkownika lub null, jeśli nie znaleziono.
   */
  async findOneById(id: string): Promise<User | null> {
    this.logger.debug(`Finding user by ID: ${id}`);
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        socialConnections: true, // Opcjonalnie dołącz powiązane połączenia społeczne
        profile: true,           // Opcjonalnie dołącz profil twórcy
      },
    });
    if (!user) this.logger.warn(`User with ID [${id}] not found.`);
    return user;
  }

  /**
   * Znajduje użytkownika po jego adresie email (ignorując wielkość liter).
   * @param email Adres email użytkownika.
   * @returns Obietnica z obiektem użytkownika lub null, jeśli nie znaleziono.
   */
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

  /**
   * Aktualizuje dane istniejącego użytkownika.
   * @param id ID użytkownika do aktualizacji.
   * @param data Dane do aktualizacji z InternalUpdateUserDto.
   * @returns Obietnica z zaktualizowanym obiektem użytkownika.
   * @throws NotFoundException jeśli użytkownik nie istnieje.
   */
  async updateUser(id: string, data: InternalUpdateUserDto): Promise<User> {
    this.logger.log(`Attempting to update user ID: ${id} with data: ${JSON.stringify(Object.keys(data))}`);
    try {
      // Jeśli aktualizujemy email, normalizuj go
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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') { // Rekord do aktualizacji nie został znaleziony
          this.logger.warn(`Update failed: User ID [${id}] not found.`);
          throw new NotFoundException(`Użytkownik o ID ${id} nie został znaleziony.`);
        }
        if (error.code === 'P2002') { // Naruszenie unikalnego ograniczenia (np. przy zmianie emaila na już istniejący)
            const target = (error.meta?.target as string[])?.join(', ');
            this.logger.warn(`Update failed for user ID [${id}]: Unique constraint violation on ${target}.`);
            throw new ConflictException(`Nie można zaktualizować użytkownika. Wartość dla ${target} jest już zajęta.`);
        }
      }
      throw new InternalServerErrorException('Wystąpił nieoczekiwany błąd podczas aktualizacji użytkownika.');
    }
  }

  /**
   * Znajduje użytkownika na podstawie tokenu weryfikacji emaila.
   * Opcjonalnie sprawdza, czy token nie wygasł (jeśli zaimplementowano `emailVerificationTokenExpiresAt`).
   * @param token Token weryfikacyjny.
   * @returns Obietnica z obiektem użytkownika lub null.
   */
  async findByEmailVerificationToken(token: string): Promise<User | null> {
    this.logger.debug(`Finding user by email verification token (prefix): ${token.substring(0,10)}...`);
    const user = await this.prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
        // Opcjonalne sprawdzenie daty wygaśnięcia tokena:
        // emailVerificationTokenExpiresAt: {
        //   gte: new Date(), // Token jest ważny, jeśli data wygaśnięcia jest większa lub równa aktualnej
        // },
      },
    });
    if (!user) this.logger.warn(`No active user found for email verification token (prefix): ${token.substring(0,10)}...`);
    return user;
  }

  /**
   * Znajduje połączenie społecznościowe na podstawie dostawcy i ID od dostawcy.
   * Dołącza powiązany obiekt użytkownika.
   * @param provider Nazwa dostawcy (np. 'google', 'twitch', 'siwe').
   * @param providerId ID od dostawcy lub adres portfela.
   * @returns Obietnica z obiektem SocialConnection (wraz z użytkownikiem) lub null.
   */
  async findSocialConnection(provider: string, providerId: string): Promise<(SocialConnection & { user: User }) | null> {
    this.logger.debug(`Finding social connection for provider [${provider}] and provider ID (prefix) [${providerId.substring(0,10)}...]`);
    const socialConnection = await this.prisma.socialConnection.findUnique({
      where: {
        provider_providerId: { provider, providerId }, // Użycie złożonego klucza unikalnego
      },
      include: {
        user: true, // Dołącz dane użytkownika powiązanego z tym połączeniem
      },
    });
    if (!socialConnection) this.logger.warn(`Social connection for provider [${provider}] and provider ID (prefix) [${providerId.substring(0,10)}...] not found.`);
    return socialConnection;
  }

  /**
   * Dodaje nowe połączenie społecznościowe do istniejącego użytkownika.
   * @param userId ID użytkownika TipJar.
   * @param provider Nazwa dostawcy.
   * @param providerId ID od dostawcy.
   * @returns Obietnica z zaktualizowanym obiektem użytkownika (z dołączonymi połączeniami).
   * @throws NotFoundException jeśli użytkownik nie istnieje.
   * @throws ConflictException jeśli to połączenie już istnieje dla innego użytkownika.
   */
  async addSocialConnection(userId: string, provider: string, providerId: string): Promise<User> {
    this.logger.log(`Attempting to add social connection [${provider}: ${providerId.substring(0,10)}...] to user ID [${userId}]`);

    // Sprawdź, czy użytkownik istnieje
    const userExists = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      this.logger.error(`Cannot add social connection: User ID [${userId}] not found.`);
      throw new NotFoundException(`Użytkownik o ID ${userId} nie został znaleziony.`);
    }

    // Sprawdź, czy to konkretne połączenie (provider + providerId) nie jest już przypisane do INNEGO użytkownika
    const existingConnection = await this.prisma.socialConnection.findUnique({
        where: { provider_providerId: { provider, providerId } },
        select: { userId: true }
    });

    if (existingConnection && existingConnection.userId !== userId) {
        this.logger.warn(`Social connection [${provider}: ${providerId.substring(0,10)}...] already exists and is linked to a different user ID [${existingConnection.userId}].`);
        throw new ConflictException(`To konto ${provider} jest już powiązane z innym użytkownikiem TipJar.`);
    }
    // Jeśli połączenie istnieje, ale dla TEGO SAMEGO użytkownika, to nic nie rób lub zwróć użytkownika
    if (existingConnection && existingConnection.userId === userId) {
        this.logger.info(`Social connection [${provider}: ${providerId.substring(0,10)}...] already exists for user ID [${userId}]. No action needed.`);
        return this.findOneById(userId) as Promise<User>; // Zwróć pełne dane użytkownika
    }

    try {
      // Dodaj nowe połączenie do listy istniejących połączeń użytkownika
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: {
          socialConnections: {
            create: [{ provider, providerId }],
          },
        },
        include: { socialConnections: true }, // Dołącz zaktualizowaną listę połączeń
      });
      this.logger.log(`Social connection [${provider}: ${providerId.substring(0,10)}...] successfully added to user ID [${userId}].`);
      return updatedUser;
    } catch (error) {
      this.logger.error(`Failed to add social connection for user ID [${userId}]: ${error.message}`, error.stack);
      // Obsługa potencjalnego błędu P2002, jeśli jakimś cudem próbowalibyśmy dodać identyczne połączenie,
      // chociaż wcześniejsze sprawdzenia powinny to wyłapać.
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
         throw new ConflictException('To połączenie społeczne już istnieje.');
      }
      throw new InternalServerErrorException('Wystąpił błąd podczas dodawania połączenia społecznego.');
    }
  }

  // Opcjonalnie: Metoda do usuwania użytkownika (rozważ soft delete)
  // async deleteUser(id: string): Promise<User | null> {
  //   this.logger.log(`Attempting to delete user ID: ${id}`);
  //   try {
  //     const user = await this.prisma.user.delete({ where: { id } });
  //     this.logger.log(`User ID [${id}] deleted successfully.`);
  //     return user;
  //   } catch (error) {
  //     // ... obsługa błędu P2025 (rekord nie znaleziony) ...
  //     return null;
  //   }
  // }
}