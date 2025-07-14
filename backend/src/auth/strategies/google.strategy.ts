import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  VerifyCallback,
  Profile as GoogleProfile,
} from 'passport-google-oauth20';
import { AuthService, ValidatedUser } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UserRole } from '@prisma/client';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly logger = new Logger(GoogleStrategy.name);

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    const clientID = configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = configService.get<string>('GOOGLE_CLIENT_SECRET');
    const callbackURL = configService.get<string>('GOOGLE_CALLBACK_URL');

    super({
      clientID: clientID || '',
      clientSecret: clientSecret || '',
      callbackURL: callbackURL || '',
      scope: ['email', 'profile'],
      passReqToCallback: true, // <<< ZMIANA #1: Kluczowa zmiana
    });

    if (!clientID || !clientSecret || !callbackURL) {
      this.logger.error(
        'Google OAuth configuration is incomplete. GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, or GOOGLE_CALLBACK_URL is missing in .env file.',
      );
      throw new Error(
        'Google OAuth configuration is incomplete. Please check your .env file.',
      );
    }
  }

  // vvv ZMIANA #2: Dodajemy 'req: Request' jako pierwszy argument vvv
  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
    done: VerifyCallback,
  ): Promise<any> {
    const { id: googleId, name, emails, photos } = profile;
    const primaryEmail = emails?.[0]?.value || null;
    const displayName = name?.givenName
      ? `${name.givenName} ${name.familyName || ''}`.trim()
      : profile.displayName;
    const avatarUrl = photos?.[0]?.value;

    this.logger.log(
      `GoogleStrategy: Received profile for Google ID [${googleId}], Email [${primaryEmail || 'N/A'}]`,
    );

    if (!googleId) {
      this.logger.error('GoogleStrategy: Google ID not found in profile object.');
      return done(
        new HttpException(
          'Nie udało się uzyskać identyfikatora użytkownika z Google.',
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
            const state = JSON.parse(Buffer.from(req.query.state as string, 'base64').toString('ascii'));
            if (state.role === 'CREATOR' || state.role === 'FAN') {
                role = state.role;
                this.logger.log(`GoogleStrategy: Role '${role}' extracted from state parameter.`);
            }
        } catch (e) {
            this.logger.warn(`GoogleStrategy: Could not parse role from state parameter: ${req.query.state}`);
        }
    }
    // ^^^ ZMIANA #3 ^^^

    try {
      // vvv ZMIANA #4: Przekazujemy odczytaną rolę do serwisu vvv
      const user: ValidatedUser = await this.authService.validateOAuthUser(
        'google',
        googleId,
        primaryEmail,
        displayName,
        avatarUrl,
        role, // <<< Przekazanie roli
      );
      done(null, user);
    } catch (error) {
      this.logger.error(
        `GoogleStrategy: Error during user validation/creation for Google ID [${googleId}]: ${error.message}`,
        error.stack,
      );
      done(
        new HttpException(
          'Wystąpił błąd serwera podczas przetwarzania danych logowania Google.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
        false,
      );
    }
  }
}