// TipJar/backend/src/auth/strategies/google.strategy.ts

import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile as GoogleProfile } from 'passport-google-oauth20'; // Używamy aliasu GoogleProfile dla typu Profile z tej biblioteki
import { AuthService, ValidatedUser } from '../auth.service'; // Nasz AuthService i interfejs ValidatedUser
import { ConfigService } from '@nestjs/config'; // Do odczytu konfiguracji (zmiennych środowiskowych)

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

    // Wywołanie super() MUSI być pierwsze, jeśli używasz 'this' przed nim.
    // Alternatywnie, nie używaj 'this' (np. this.logger) przed super().
    // W tym przypadku najpierw wywołamy super, a potem sprawdzimy, czy wartości są poprawne
    // (chociaż idealnie byłoby to zrobić przed super, ale bez użycia 'this').
    // Najprostszym rozwiązaniem jest upewnienie się, że zmienne są przekazane poprawnie do super.
    // Jeśli którakolwiek z nich jest undefined, strategia i tak nie zadziała poprawnie.

    super({
      clientID: clientID || '', // Przekaż pusty string, jeśli undefined, aby uniknąć błędu typu
      clientSecret: clientSecret || '', // Strategia sama rzuci błąd, jeśli są puste
      callbackURL: callbackURL || '',
      scope: ['email', 'profile'],
      passReqToCallback: false,
    });

    // Sprawdzenie konfiguracji można umieścić PO super(), jeśli chcemy użyć this.logger
    // lub przed super(), jeśli logger jest statyczny lub nie używamy this.
    if (!clientID || !clientSecret || !callbackURL) {
      this.logger.error( // Teraz 'this' jest dostępne
        'Google OAuth configuration is incomplete. GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, or GOOGLE_CALLBACK_URL is missing in .env file.'
      );
      // Rzucenie błędu tutaj zatrzyma inicjalizację, co jest dobrym zachowaniem.
      throw new Error(
        'Google OAuth configuration is incomplete. Please check your .env file.',
      );
    }
  }

  // Metoda validate pozostaje bez zmian
  async validate(accessToken: string, refreshToken: string, profile: GoogleProfile, done: VerifyCallback): Promise<any> {
    const { id: googleId, name, emails, photos } = profile;
    const primaryEmail = emails?.[0]?.value || null;
    const displayName = name?.givenName 
      ? `${name.givenName} ${name.familyName || ''}`.trim() 
      : profile.displayName;
    const avatarUrl = photos?.[0]?.value;

    this.logger.log(`GoogleStrategy: Received profile for Google ID [${googleId}], Email [${primaryEmail || 'N/A'}]`);

    if (!googleId) {
      this.logger.error('GoogleStrategy: Google ID not found in profile object.');
      return done(new HttpException('Nie udało się uzyskać identyfikatora użytkownika z Google.', HttpStatus.UNAUTHORIZED), false);
    }

    try {
      const user: ValidatedUser = await this.authService.validateOAuthUser(
        'google',
        googleId,
        primaryEmail,
        displayName,
        avatarUrl,
      );
      done(null, user);
    } catch (error) {
      this.logger.error(`GoogleStrategy: Error during user validation/creation for Google ID [${googleId}]: ${error.message}`, error.stack);
      done(new HttpException('Wystąpił błąd serwera podczas przetwarzania danych logowania Google.', HttpStatus.INTERNAL_SERVER_ERROR), false);
    }
  }
}