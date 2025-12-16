import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-twitch-new';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UserRole } from '@prisma/client';

type StatePayload = {
  role?: 'CREATOR' | 'FAN';
  timestamp?: number;
  returnTo?: string;
};

interface TwitchProfile {
  id: string;
  login: string;
  display_name: string;
  email: string;
  profile_image_url: string;
  provider: 'twitch';
}

@Injectable()
export class TwitchStrategy extends PassportStrategy(
  Strategy as any,
  'twitch',
) {
  private readonly logger = new Logger(TwitchStrategy.name);

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    const clientID = configService.getOrThrow<string>('TWITCH_CLIENT_ID');
    const clientSecret = configService.getOrThrow<string>(
      'TWITCH_CLIENT_SECRET',
    );
    const callbackURL = configService.getOrThrow<string>('TWITCH_CALLBACK_URL');

    super({
      clientID,
      clientSecret,
      callbackURL,
      authorizationURL: 'https://id.twitch.tv/oauth2/authorize',
      tokenURL: 'https://id.twitch.tv/oauth2/token',
      scope: ['user:read:email'],
      passReqToCallback: true,
      state: false, // 🟢 WAŻNE: Wyłączamy sesję Passporta
      customHeaders: {
        'Client-ID': clientID,
      },
    });
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: TwitchProfile,
    done: (error: Error | null, user?: any, info?: any) => void,
  ): Promise<void> {
    const { id: twitchId, display_name, email, profile_image_url } = profile;

    // --- LOGIKA RĘCZNEGO ODCZYTU ROLI I WALIDACJI CZASU ---
    let role: UserRole = UserRole.FAN; // Domyślnie FAN

    if (req.query.state) {
      const rawState = req.query.state as string;
      try {
        const decodedState = Buffer.from(rawState, 'base64').toString('ascii');
        const state = JSON.parse(decodedState) as StatePayload;

        // 1. Walidacja Czasu (max 5 min)
        if (state.timestamp) {
          const now = Date.now();
          const diff = now - state.timestamp;
          if (diff > 300000) {
            // 300000ms = 5 minut
            throw new Error('OAuth state expired (CSRF protection)');
          }
        }

        // 2. Przypisanie Roli
        if (state && (state.role === 'CREATOR' || state.role === 'FAN')) {
          role = state.role === 'CREATOR' ? UserRole.CREATOR : UserRole.FAN;
          this.logger.log(
            `TwitchStrategy: Role '${role}' recovered from state.`,
          );
        }
      } catch (e) {
        this.logger.warn(
          `TwitchStrategy: State validation failed. Error: ${(e as Error).message}`,
        );
        if ((e as Error).message.includes('expired')) {
          throw new HttpException(
            'Login session expired. Try again.',
            HttpStatus.FORBIDDEN,
          );
        }
      }
    }
    // -----------------------------------------------------

    try {
      // vvv ZMIANA #4: Przekazujemy odczytaną rolę do serwisu vvv
      const user = await this.authService.validateOAuthUser(
        'twitch',
        twitchId,
        email,
        display_name,
        profile_image_url,
        role, // <<< Przekazanie roli
      );
      this.logger.log(
        `TwitchStrategy: User validated/created for Twitch ID: ${twitchId}. User ID: ${user.id}`,
      );
      return done(null, user);
    } catch (error: unknown) {
      // ... obsługa błędów bez zmian
      if (error instanceof HttpException) {
        this.logger.error(
          `TwitchStrategy: Error during user validation/creation for Twitch ID ${twitchId}: ${error.message}`,
          error.stack,
        );
        return done(error, false);
      }
      if (error instanceof Error) {
        this.logger.error(
          `TwitchStrategy: An unexpected error occurred during user validation/creation for Twitch ID ${twitchId}: ${error.message}`,
          error.stack,
        );
      } else {
        this.logger.error(
          `TwitchStrategy: An unknown error occurred during user validation/creation for Twitch ID ${twitchId}.`,
        );
      }
      return done(
        new HttpException(
          'Wewnętrzny błąd serwera podczas przetwarzania logowania Twitch.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
        false,
      );
    }
  }
}
