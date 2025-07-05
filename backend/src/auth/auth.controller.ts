// TipJar/backend/src/auth/auth.controller.ts
import {
  Controller, Post, Body, UseGuards, Req, Res, Get, Param,
  HttpCode, HttpStatus, UnauthorizedException, BadRequestException, Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // Główny AuthGuard z NestJS
import { AuthService, AuthTokens, ValidatedUser } from './auth.service';
import { Request, Response } from 'express'; // Typy dla Express
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SiweVerifier } from './strategies/siwe.verifier'; // Nasz SiweVerifier
import { User as UserModel, UserRole } from '../../generated/prisma';// Model User i Enum z Prisma

// DTO classes
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { SiweRequestNonceDto } from './dto/siwe-request-nonce.dto';
import { SiweVerifySignatureDto } from './dto/siwe-verify-signature.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';


@Controller('auth') // Globalny prefix /api/v1/auth (zdefiniowany w main.ts)
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  private readonly commonCookieOptions; // Opcje dla ciasteczek HttpOnly

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private jwtService: JwtService,
    private siweVerifier: SiweVerifier, // Wstrzyknięcie SiweVerifier
  ) {
    // Wspólne opcje dla ciasteczek JWT
    this.commonCookieOptions = {
        httpOnly: true, // Ciasteczko niedostępne dla JavaScript po stronie klienta
        secure: this.configService.get<string>('NODE_ENV') === 'production', // Wysyłaj tylko przez HTTPS na produkcji
        sameSite: 'lax' as const, // Ochrona CSRF dla większości przypadków; 'strict' jest bezpieczniejsze, ale mniej wygodne
        // path: '/', // Domyślnie ciasteczko jest dostępne dla wszystkich ścieżek w domenie
    };
  }

  /**
   * Prywatna metoda pomocnicza do ustawiania ciasteczek autoryzacyjnych.
   */
  private setAuthCookies(response: Response, tokens: AuthTokens): void {
    // Ciasteczko dla Access Tokena
    response.cookie('access_token', tokens.accessToken, {
        ...this.commonCookieOptions,
        maxAge: parseInt(this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION_SECONDS', '900'), 10) * 1000, // np. 15 minut
    });
    // Ciasteczko dla Refresh Tokena
    response.cookie('refresh_token', tokens.refreshToken, {
        ...this.commonCookieOptions,
        maxAge: parseInt(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_SECONDS', '604800'), 10) * 1000, // np. 7 dni
        path: '/api/v1/auth/refresh-token', // Ogranicz zasięg ciasteczka refresh_token tylko do endpointu odświeżania
    });
  }

  /**
   * Prywatna metoda pomocnicza do czyszczenia ciasteczek autoryzacyjnych (wylogowanie).
   */
  private clearAuthCookies(response: Response): void {
    response.clearCookie('access_token', this.commonCookieOptions);
    response.clearCookie('refresh_token', { ...this.commonCookieOptions, path: '/api/v1/auth/refresh-token' });
  }

  // --- Endpointy dla Rejestracji i Logowania Email/Hasło ---

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res({ passthrough: true }) response: Response, // passthrough: true, aby NestJS nadal wysłał odpowiedź
  ): Promise<{ message: string; user: Omit<ValidatedUser, 'password' /* jeśli ValidatedUser zawierałoby hasło */> }> {
    this.logger.log(`Registration attempt initiated for email: ${registerUserDto.email}`);
    // Podstawowa walidacja DTO (powinna być obsłużona przez ValidationPipe globalnie)
    if (!registerUserDto.email || !registerUserDto.password || !registerUserDto.displayName) {
        throw new BadRequestException('Email, hasło i nazwa wyświetlana są wymagane do rejestracji.');
    }
    const user = await this.authService.registerUser(registerUserDto);
    
    // Automatyczne logowanie po pomyślnej rejestracji i weryfikacji email (jeśli dotyczy)
    // Jeśli weryfikacja email jest wymagana przed pierwszym logowaniem, ten krok można pominąć.
    // Na razie zakładamy, że chcemy zalogować od razu.
    const tokens = await this.authService.login(user);
    this.setAuthCookies(response, tokens);
    
    // Usuń potencjalnie wrażliwe dane przed zwróceniem (np. jeśli ValidatedUser miałby więcej pól)
    const { ...result } = user; 
    return { message: 'Rejestracja pomyślna. Wysłano email weryfikacyjny (jeśli dotyczy).', user: result };
  }

  @Post('login')
  @UseGuards(AuthGuard('local')) // Aktywuje LocalStrategy
  @HttpCode(HttpStatus.OK)
  async login(
    @Req() req: Request, // Po AuthGuard('local'), `req.user` zawiera obiekt zwrócony przez LocalStrategy.validate()
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message: string; user: ValidatedUser; accessToken: string /* Dla SPA, jeśli potrzebny w ciele */ }> {
    const user = req.user as ValidatedUser; // Rzutowanie na nasz typ
    this.logger.log(`Login successful for user: ${user.email} (ID: ${user.id}). Setting auth cookies.`);
    const tokens = await this.authService.login(user); // AuthService.login teraz generuje oba tokeny
    this.setAuthCookies(response, tokens);
    // Zwracamy accessToken również w ciele odpowiedzi, co może być przydatne dla niektórych klientów SPA,
    // mimo że głównym mechanizmem powinny być ciasteczka HttpOnly.
    return { message: 'Logowanie pomyślne.', user, accessToken: tokens.accessToken };
  }

  // --- Endpointy dla Weryfikacji Emaila ---

  @Get('verify-email/:token') // Token przekazywany jako parametr ścieżki
  @HttpCode(HttpStatus.OK)
  async verifyEmail(
    @Param('token') token: string,
    @Res({ passthrough: true }) response: Response, // Aby móc ewentualnie przekierować
  ): Promise<{ message: string }> {
    this.logger.log(`Email verification attempt with token: ${token.substring(0, 10)}...`);
    await this.authService.verifyEmailToken(token);
    
    // Opcjonalnie: Zamiast zwracać JSON, można przekierować użytkownika na stronę logowania z komunikatem sukcesu.
    // response.redirect(`${this.configService.get('FRONTEND_URL')}/login?emailVerified=true`);
    // return; // Jeśli używasz redirect, nie zwracaj niczego innego.
    
    return { message: 'Adres email został pomyślnie zweryfikowany. Możesz się teraz zalogować.' };
  }

  // --- Endpointy dla Odświeżania Tokenów i Wylogowania ---

  @Post('refresh-token')
  // Można dodać @UseGuards(AuthGuard('jwt-refresh')), jeśli JwtRefreshStrategy jest skonfigurowana
  // do odczytywania tokena z ciasteczka `refresh_token`.
  // Jeśli nie, logika odczytu i weryfikacji tokena jest w kontrolerze/serwisie.
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Req() req: Request, // Do odczytu ciasteczka refresh_token
    @Body() body: { refreshToken?: string }, // Alternatywnie, jeśli frontend wysyła w ciele
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ accessToken: string }> {
    const incomingRefreshToken = req.cookies?.['refresh_token'] || body.refreshToken;
    if (!incomingRefreshToken) {
      this.logger.warn('Refresh token endpoint called without a refresh token.');
      throw new UnauthorizedException('Brak refresh tokena.');
    }

    // Walidacja refresh tokena i odzyskanie userId
    // W pełnej implementacji z Guard('jwt-refresh'), req.user byłby dostępny i zawierałby zdekodowany payload.
    // Tutaj musimy ręcznie zdekodować token lub przekazać go do serwisu, który to zrobi.
    let userIdFromToken: string;
    try {
      const decoded = this.jwtService.verify(incomingRefreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      }) as { sub: string }; // Rzutowanie na oczekiwany typ payloadu
      userIdFromToken = decoded.sub;
    } catch (err) {
      this.logger.warn('Invalid refresh token presented at /refresh-token endpoint (verification failed). Clearing cookies.');
      this.clearAuthCookies(response); // Czyścimy ciasteczka przy nieudanym odświeżeniu
      throw new UnauthorizedException('Nieprawidłowy lub wygasły refresh token.');
    }

    if (!userIdFromToken) {
        this.logger.error('Refresh token decoded, but userId (sub) is missing.');
        this.clearAuthCookies(response);
        throw new UnauthorizedException('Nieprawidłowy format refresh tokena.');
    }
    
    this.logger.log(`Refresh token request for user ID: ${userIdFromToken}.`);
    const newTokens = await this.authService.refreshToken(userIdFromToken, incomingRefreshToken);
    this.setAuthCookies(response, newTokens); // Ustaw nowe ciasteczka (w tym nowy refresh_token)
    return { accessToken: newTokens.accessToken }; // Zwróć nowy access token
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt')) // Wymaga ważnego access tokena do wylogowania (chroni przed CSRF logout)
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message: string }> {
    const user = req.user as ValidatedUser; // req.user z JwtStrategy
    this.logger.log(`Logout request for user ID: ${user.id}.`);
    await this.authService.logout(user.id); // Usuń/unieważnij refresh token w bazie
    this.clearAuthCookies(response); // Wyczyść ciasteczka autoryzacyjne
    return { message: 'Wylogowano pomyślnie.' };
  }

  // --- Endpointy dla Google OAuth ---
  @Get('google')
  @UseGuards(AuthGuard('google')) // Aktywuje GoogleStrategy
  async googleAuth(@Req() req: Request) {
    // Guard automatycznie przekierowuje do strony logowania Google.
    this.logger.log('Initiating Google OAuth flow.');
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google')) // Obsługuje callback od Google
  async googleAuthRedirect(@Req() req: Request, @Res({ passthrough: true }) response: Response) {
    const user = req.user as ValidatedUser; // req.user z GoogleStrategy.validate()
    if (!user) {
      this.logger.error('Google OAuth callback - no user object in request after strategy validation.');
      // Przekieruj do strony błędu na frontendzie
      response.redirect(`${this.configService.get<string>('FRONTEND_LOGIN_FAILURE_REDIRECT_URL', '/login?error=google_oauth_failed')}`);
      return;
    }
    this.logger.log(`Google OAuth successful for user: ${user.email} (ID: ${user.id}). Generating tokens and setting cookies.`);
    const tokens = await this.authService.login(user);
    this.setAuthCookies(response, tokens);
    response.redirect(this.configService.get<string>('FRONTEND_LOGIN_SUCCESS_REDIRECT_URL', '/dashboard'));
  }

  // --- Endpointy dla Twitch OAuth ---
  @Get('twitch')
  @UseGuards(AuthGuard('twitch')) // Aktywuje TwitchStrategy
  async twitchAuth(@Req() req: Request) {
    this.logger.log('Initiating Twitch OAuth flow.');
  }

  @Get('twitch/callback')
  @UseGuards(AuthGuard('twitch')) // Obsługuje callback od Twitch
  async twitchAuthRedirect(@Req() req: Request, @Res({ passthrough: true }) response: Response) {
    const user = req.user as ValidatedUser;
    if (!user) {
      this.logger.error('Twitch OAuth callback - no user object in request after strategy validation.');
      response.redirect(`${this.configService.get<string>('FRONTEND_LOGIN_FAILURE_REDIRECT_URL', '/login?error=twitch_oauth_failed')}`);
      return;
    }
    this.logger.log(`Twitch OAuth successful for user: ${user.email || `ID ${user.id}`}. Generating tokens and setting cookies.`);
    const tokens = await this.authService.login(user);
    this.setAuthCookies(response, tokens);
    response.redirect(this.configService.get<string>('FRONTEND_LOGIN_SUCCESS_REDIRECT_URL', '/dashboard'));
  }
  
  // --- Endpointy dla SIWE (Sign-In with Ethereum) ---
  @Post('siwe/nonce')
  @HttpCode(HttpStatus.OK)
  async getSiweNonce(@Body() body: SiweRequestNonceDto): Promise<{ nonce: string }> {
    if (!body.address /* || !isEthereumAddress(body.address) - dodaj walidację przez DTO */) {
      throw new BadRequestException('Adres portfela jest wymagany i musi być poprawny.');
    }
    this.logger.log(`Generating SIWE nonce for address: ${body.address}`);
    const nonce = await this.authService.generateSiweNonce(body.address);
    return { nonce };
  }

  @Post('siwe/verify')
  @HttpCode(HttpStatus.OK)
  async verifySiweSignature(
    @Body() siweVerifyDto: SiweVerifySignatureDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message: string; user: ValidatedUser; accessToken: string }> {
    const { message, signature, address } = siweVerifyDto;
    // Podstawowa walidacja (pełna przez DTO i ValidationPipe)
    if (!message || !signature || !address) {
      throw new BadRequestException('Wiadomość SIWE, podpis i adres portfela są wymagane.');
    }
    this.logger.log(`SIWE verification attempt for address from request: ${address}`);
    // SiweVerifier wewnętrznie wywoła AuthService.verifySiweMessage (z walidacją nonce z Redis)
    // a następnie AuthService.validateOAuthUser
    const user = await this.siweVerifier.verifySignatureAndLogin(message, signature, address);
    
    this.logger.log(`SIWE Login successful for user ID: ${user.id}. Generating tokens and setting cookies.`);
    const tokens = await this.authService.login(user);
    this.setAuthCookies(response, tokens);
    return { message: 'Logowanie SIWE pomyślne.', user, accessToken: tokens.accessToken };
  }

  // --- Endpoint do Pobierania Danych Zalogowanego Użytkownika ---
  @Get('me')
  @UseGuards(AuthGuard('jwt')) // Chroniony przez JwtStrategy (wymaga ważnego Access Tokena)
  getProfile(@Req() req: Request): ValidatedUser {
    const user = req.user as ValidatedUser;
    this.logger.log(`Fetching profile for authenticated user ID: ${user.id}`);
    // `req.user` jest wypełniany przez `JwtStrategy.validate()` i zawiera dane z tokena.
    // Jeśli potrzebne są bardziej aktualne dane, można tutaj odpytać UsersService.
    return user; 
  }
}
