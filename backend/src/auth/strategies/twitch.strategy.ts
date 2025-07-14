import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile as TwitchProfile } from 'passport-twitch-new';
import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UserRole } from '@prisma/client';

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
      callbackURL: configService.get<string>('TWITCH_CALLBACK_URL'),
      scope: 'user:read:email',
      passReqToCallback: true, // <<< ZMIANA #1: Kluczowa zmiana, aby uzyskać dostęp do 'req'
    });
  }

  // vvv ZMIANA #2: Dodajemy 'req: Request' jako pierwszy argument vvv
  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: TwitchProfile,
    done: (error: any, user?: any, info?: any) => void,
  ): Promise<any> {
    const twitchId = profile.id;
    const displayName = profile.display_name || profile.login;
    const email = profile.email || null;
    const avatarUrl = profile.profile_image_url;

    this.logger.log(
      `TwitchStrategy: Received profile for Twitch ID: ${twitchId}, Login: ${profile.login}`,
    );

    if (!twitchId) {
      this.logger.error('TwitchStrategy: Twitch ID not found in profile.');
      return done(
        new HttpException(
          'Nie udało się uzyskać ID użytkownika z Twitch',
          HttpStatus.UNAUTHORIZED,
        ),
        false,
      );
    }

    // vvv ZMIANA #3: Odczytujemy rolę z parametru 'state' vvv
    let role = UserRole.FAN; // Domyślna rola
    if (req.query.state) {
      try {
        // Frontend przekaże rolę jako JSON w parametrze 'state'
        const state = JSON.parse(req.query.state as string);
        if (state.role === 'CREATOR' || state.role === 'FAN') {
          role = state.role;
          this.logger.log(`TwitchStrategy: Role '${role}' extracted from state parameter.`);
        }
      } catch (e) {
        this.logger.warn(
          `TwitchStrategy: Could not parse role from state parameter: ${req.query.state}`,
        );
      }
    }
    // ^^^ ZMIANA #3 ^^^

    try {
      // vvv ZMIANA #4: Przekazujemy odczytaną rolę do serwisu vvv
      const user = await this.authService.validateOAuthUser(
        'twitch',
        twitchId,
        email,
        displayName,
        avatarUrl,
        role, // <<< Przekazanie roli
      );
      this.logger.log(
        `TwitchStrategy: User validated/created for Twitch ID: ${twitchId}. User ID: ${user.id}`,
      );
      return done(null, user);
    } catch (error: unknown) {
      // ... obsługa błędów bez zmian
      if (error instanceof HttpException) {
        this.logger.error(`TwitchStrategy: Error during user validation/creation for Twitch ID ${twitchId}: ${error.message}`, error.stack);
        return done(error, false);
      }
      if (error instanceof Error) {
        this.logger.error(`TwitchStrategy: An unexpected error occurred during user validation/creation for Twitch ID ${twitchId}: ${error.message}`, error.stack);
      } else {
        this.logger.error(`TwitchStrategy: An unknown error occurred during user validation/creation for Twitch ID ${twitchId}.`);
      }
      return done(new HttpException('Wewnętrzny błąd serwera podczas przetwarzania logowania Twitch.', HttpStatus.INTERNAL_SERVER_ERROR), false);
    }
  }
}