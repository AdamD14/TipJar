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
      const user: ValidatedUser = await this.authService.validateOAuthUser(
        'twitch',
        twitchId,
        email,
        displayName,
        avatarUrl,
      );
      done(null, user);
    } catch (error) {
      this.logger.error(`TwitchStrategy: Error during user validation/creation for Twitch ID ${twitchId}: ${error.message}`, error.stack);
      done(new HttpException('Błąd podczas przetwarzania danych logowania Twitch po stronie serwera.', HttpStatus.INTERNAL_SERVER_ERROR), false);
    }
  }
}