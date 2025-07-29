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

type StatePayload = {
  role?: 'CREATOR' | 'FAN';
};

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
      passReqToCallback: true,
    });

    if (!clientID || !clientSecret || !callbackURL) {
      this.logger.error(
        'Google OAuth configuration is incomplete. Please check your .env file.',
      );
      throw new Error(
        'Google OAuth configuration is incomplete. Please check your .env file.',
      );
    }
  }

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
      `GoogleStrategy: Received profile for Google ID [${googleId}], Email [${
        primaryEmail || 'N/A'
      }]`,
    );

    if (!googleId) {
      return done(
        new HttpException(
          'Nie udało się uzyskać identyfikatora użytkownika z Google.',
          HttpStatus.UNAUTHORIZED,
        ),
        false,
      );
    }

    let role = UserRole.FAN;
    if (req.query.state) {
      try {
        const state = JSON.parse(
          Buffer.from(req.query.state as string, 'base64').toString('ascii'),
        ) as StatePayload;

        if (state && (state.role === 'CREATOR' || state.role === 'FAN')) {
          // <<< POPRAWKA 1: Konwertujemy string na enum
          role = state.role === 'CREATOR' ? UserRole.CREATOR : UserRole.FAN;
          this.logger.log(
            `GoogleStrategy: Role '${state.role}' extracted from state parameter and set to enum.`,
          );
        }
      } catch (e) {
        // <<< POPRAWKA 2: Używamy zmiennej 'e'
        this.logger.warn(
          `GoogleStrategy: Could not parse role from state parameter: ${JSON.stringify(
            req.query.state,
          )}. Error: ${(e as Error).message}`,
        );
      }
    }

    try {
      const user: ValidatedUser = await this.authService.validateOAuthUser(
        'google',
        googleId,
        primaryEmail,
        displayName,
        avatarUrl,
        role,
      );
      done(null, user);
    } catch (error: unknown) {
      this.logger.error(
        `GoogleStrategy: Error during user validation/creation for Google ID [${googleId}]: ${
          (error as Error).message
        }`,
        (error as Error).stack,
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
