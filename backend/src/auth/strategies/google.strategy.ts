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
  timestamp?: number;
};

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly logger = new Logger(GoogleStrategy.name);

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    // getOrThrow rzuci błędem od razu przy starcie, jeśli brakuje zmiennych w .env
    const clientID = configService.getOrThrow<string>('GOOGLE_CLIENT_ID');
    const clientSecret = configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET');
    const callbackURL = configService.getOrThrow<string>('GOOGLE_CALLBACK_URL');

    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['email', 'profile'],
      passReqToCallback: true,
      state: false, // 🟢 WAŻNE: Wyłączamy sesję Passporta (naprawia błąd 500)
    });
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
          if (diff > 300000) { // 300000ms = 5 minut
            throw new Error('OAuth state expired (CSRF protection)');
          }
        }

        // 2. Przypisanie Roli
        if (state && (state.role === 'CREATOR' || state.role === 'FAN')) {
          role = state.role === 'CREATOR' ? UserRole.CREATOR : UserRole.FAN;
          this.logger.log(`GoogleStrategy: Role '${role}' recovered from state.`);
        }
      } catch (e) {
        this.logger.warn(`GoogleStrategy: State validation failed. Error: ${(e as Error).message}`);
        // Jeśli stan wygasł, blokujemy logowanie dla bezpieczeństwa
        if ((e as Error).message.includes('expired')) {
          throw new HttpException('Login session expired. Try again.', HttpStatus.FORBIDDEN);
        }
      }
    }
    // -----------------------------------------------------

    try {
      const user: ValidatedUser = await this.authService.validateOAuthUser(
        'google',
        googleId,
        primaryEmail,
        displayName,
        avatarUrl,
        role, // Przekazujemy odzyskaną rolę
      );
      done(null, user);
    } catch (error: unknown) {
      this.logger.error(`GoogleStrategy Error: ${(error as Error).message}`);
      done(new HttpException('OAuth error', HttpStatus.INTERNAL_SERVER_ERROR), false);
    }
  }
}
