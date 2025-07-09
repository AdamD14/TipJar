// TipJar/backend/src/auth/strategies/twitch.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile as TwitchProfile } from 'passport-twitch-new';
import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService, ValidatedUser } from '../auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TwitchStrategy extends PassportStrategy(Strategy, 'twitch') {
  private readonly logger = new Logger(TwitchStrategy.name);

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>('TWITCH_CLIENT_ID'),
      clientSecret: configService.get<string>('TWITCH_CLIENT_SECRET'),
      callbackURL: configService.get<string>('TWITCH_CALLBACK_URL'), // np. http://localhost:3001/api/v1/auth/twitch/callback
      scope: 'user:read:email', // Minimalny potrzebny scope
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: TwitchProfile, done: (error: any, user?: any, info?: any) => void): Promise<any> {
    // Struktura obiektu 'profile' z Twitcha może się różnić.
    // Zawsze sprawdzaj dokumentację 'passport-twitch-new' lub loguj obiekt 'profile'.
    const twitchId = profile.id;
    const displayName = profile.display_name || profile.login; // Twitch ma display_name i login
    const email = profile.email || null; // Email jest dostępny, jeśli scope 'user:read:email' został przyznany
    const avatarUrl = profile.profile_image_url;

    this.logger.log(`TwitchStrategy: Received profile for Twitch ID: ${twitchId}, Login: ${profile.login}`);

    if (!twitchId) {
      this.logger.error('TwitchStrategy: Twitch ID not found in profile.');
      return done(new HttpException('Nie udało się uzyskać ID użytkownika z Twitch', HttpStatus.UNAUTHORIZED), false);
    }

    try {
      // Walidacja/tworzenie użytkownika w TipJar na podstawie danych z Twitcha
      const user = await this.authService.validateOAuthUser(
        'twitch',        // Provider
        twitchId,        // ProviderId (ID użytkownika Twitch)
        email,           // Email
        displayName,     // Nazwa wyświetlana
        avatarUrl,       // URL avatara
      );
      this.logger.log(`TwitchStrategy: User validated/created for Twitch ID: ${twitchId}. User ID: ${user.id}`);
      return done(null, user); // Zwróć zwalidowanego użytkownika
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        this.logger.error(`TwitchStrategy: Error during user validation/creation for Twitch ID ${twitchId}: ${error.message}`, error.stack);
        return done(error, false);
      }
      // Obsługa innych typów błędów
      if (error instanceof Error) {
        this.logger.error(`TwitchStrategy: An unexpected error occurred during user validation/creation for Twitch ID ${twitchId}: ${error.message}`, error.stack);
      } else {
        this.logger.error(`TwitchStrategy: An unknown error occurred during user validation/creation for Twitch ID ${twitchId}.`);
      }
      return done(new HttpException('Wewnętrzny błąd serwera podczas przetwarzania logowania Twitch.', HttpStatus.INTERNAL_SERVER_ERROR), false);
    }
  }
}
