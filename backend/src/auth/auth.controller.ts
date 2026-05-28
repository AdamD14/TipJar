import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService, AuthTokens, ValidatedUser } from './auth.service';
import { Request, Response, CookieOptions } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { TwitchOAuthGuard } from './guards/twitch-oauth.guard';

interface JwtPayload {
  sub: string;
  email?: string;
  role?: string;
}

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  private commonCookieOptions: CookieOptions;

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
    this.commonCookieOptions = {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'lax' as const,
    };
  }

  private setAuthCookies(response: Response, tokens: AuthTokens): void {
    response.cookie('access_token', tokens.accessToken, {
      ...this.commonCookieOptions,
      maxAge:
        parseInt(
          this.configService.get<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION_SECONDS',
            '900',
          ),
          10,
        ) * 1000,
    });
    response.cookie('refresh_token', tokens.refreshToken, {
      ...this.commonCookieOptions,
      maxAge:
        parseInt(
          this.configService.get<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION_SECONDS',
            '604800',
          ),
          10,
        ) * 1000,
      path: '/api/v1/auth/refresh-token',
    });
  }

  private clearAuthCookies(response: Response): void {
    response.clearCookie('access_token', this.commonCookieOptions);
    response.clearCookie('refresh_token', {
      ...this.commonCookieOptions,
      path: '/api/v1/auth/refresh-token',
    });
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ user: ValidatedUser; accessToken: string }> {
    this.logger.log(
      `Registration attempt initiated for email: ${registerUserDto.email}`,
    );
    const user = await this.authService.registerUser(registerUserDto);
    const tokens = await this.authService.login(user);
    this.setAuthCookies(response, tokens);
    const { ...result } = user;

    return {
      user: result,
      accessToken: tokens.accessToken,
    };
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message: string; user: ValidatedUser; accessToken: string }> {
    const user = req.user as ValidatedUser;
    this.logger.log(
      `Login successful for user: ${user.email} (ID: ${user.id}). Setting auth cookies.`,
    );
    const tokens = await this.authService.login(user);
    this.setAuthCookies(response, tokens);
    return {
      message: 'Logowanie pomyślne.',
      user,
      accessToken: tokens.accessToken,
    };
  }

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  googleAuth() {
    this.logger.log(`Initiating Google OAuth flow.`);
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = req.user as ValidatedUser;
    if (!user) {
      this.logger.error(
        'Google OAuth callback - no user object in request after strategy validation.',
      );
      response.redirect(
        `${this.configService.get<string>(
          'FRONTEND_URL',
          'http://localhost:3000',
        )}/register?error=google_oauth_failed`,
      );
      return;
    }
    this.logger.log(
      `Google OAuth successful for user: ${user.email} (ID: ${user.id}). Generating tokens.`,
    );
    const tokens = await this.authService.login(user);
    this.setAuthCookies(response, tokens);

    const frontendUrl = this.configService.get<string>(
      'FRONTEND_URL',
      'http://localhost:3000',
    );

    if (!user.username) {
      this.logger.log(
        `User ${user.id} needs to set username. Redirecting to /choose-username`,
      );
      response.redirect(`${frontendUrl}/choose-username`);
    } else if (!user.hasCompletedOnboarding) {
      if (user.role === 'CREATOR') {
        this.logger.log(
          `Creator ${user.id} has username but needs to complete onboarding steps. Redirecting to /onboarding/creator/step-1`,
        );
        response.redirect(`${frontendUrl}/onboarding/creator/step-1`);
      } else {
        // Fans should be marked complete by setUsername, but if not, send them to dashboard or fallback
        const dashboard = `/@${user.username}/fan-desktop/explore`;
        response.redirect(`${frontendUrl}${dashboard}`);
      }
    } else {
      const dashboard =
        user.role === 'CREATOR'
          ? `/@${user.username}/creator-desktop`
          : `/@${user.username}/fan-desktop/explore`;
      this.logger.log(
        `User ${user.id} has completed onboarding. Redirecting to ${dashboard}`,
      );
      response.redirect(`${frontendUrl}${dashboard}`);
    }
  }

  @Get('twitch')
  @UseGuards(TwitchOAuthGuard)
  twitchAuth() {
    this.logger.log(`Initiating Twitch OAuth flow.`);
  }

  @Get('twitch/callback')
  @UseGuards(AuthGuard('twitch'))
  async twitchAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = req.user as ValidatedUser;
    if (!user) {
      this.logger.error(
        'Twitch OAuth callback - no user object in request after strategy validation.',
      );
      response.redirect(
        `${this.configService.get<string>(
          'FRONTEND_URL',
          'http://localhost:3000',
        )}/register?error=twitch_oauth_failed`,
      );
      return;
    }
    this.logger.log(
      `Twitch OAuth successful for user: ${
        user.email || `ID ${user.id}`
      }. Generating tokens.`,
    );
    const tokens = await this.authService.login(user);
    this.setAuthCookies(response, tokens);

    if (req.query.state) {
      try {
        const rawState = req.query.state as string;
        const decodedState = Buffer.from(rawState, 'base64').toString('ascii');
        const state = JSON.parse(decodedState) as { returnTo?: string };
        if (state.returnTo) {
          const frontendUrl = this.configService.get<string>(
            'FRONTEND_URL',
            'http://localhost:3000',
          );
          // Ensure we don't start with / if frontendUrl has it, or handle cleanly.
          // Assuming returnTo starts with /
          this.logger.log(`Redirecting to custom returnTo: ${state.returnTo}`);
          response.redirect(`${frontendUrl}${state.returnTo}`);
          return;
        }
      } catch (e) {
        this.logger.warn(`Failed to parse state for redirect: ${e}`);
      }
    }

    const frontendUrl = this.configService.get<string>(
      'FRONTEND_URL',
      'http://localhost:3000',
    );

    if (!user.username) {
      this.logger.log(
        `User ${user.id} needs to set username. Redirecting to /choose-username`,
      );
      response.redirect(`${frontendUrl}/choose-username`);
    } else if (!user.hasCompletedOnboarding) {
      if (user.role === 'CREATOR') {
        this.logger.log(
          `Creator ${user.id} has username but needs to complete onboarding steps. Redirecting to /onboarding/creator/step-1`,
        );
        response.redirect(`${frontendUrl}/onboarding/creator/step-1`);
      } else {
        const dashboard = `/@${user.username}/fan-desktop/explore`;
        response.redirect(`${frontendUrl}${dashboard}`);
      }
    } else {
      const dashboard =
        user.role === 'CREATOR'
          ? `/@${user.username}/creator-desktop`
          : `/@${user.username}/fan-desktop/explore`;
      this.logger.log(
        `User ${user.id} has completed onboarding. Redirecting to ${dashboard}`,
      );
      response.redirect(`${frontendUrl}${dashboard}`);
    }
  }

  /**
   * Returns the current access_token for JS clients.
   * This is needed because access_token cookie is HttpOnly.
   */
  @Post('token')
  @HttpCode(HttpStatus.OK)
  getToken(@Req() req: Request): { accessToken: string | null } {
    const cookies = req.cookies as Record<string, string>;
    const accessToken = cookies?.['access_token'] || null;

    if (!accessToken) {
      return { accessToken: null };
    }

    // Validate the token is still valid
    try {
      this.jwtService.verify(accessToken);
      return { accessToken };
    } catch {
      return { accessToken: null };
    }
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() req: Request): Promise<ValidatedUser> {
    const user = req.user as ValidatedUser;
    this.logger.log(`Fetching profile for authenticated user ID: ${user.id}`);
    return this.authService.getUserProfile(user.id);
  }

  @Get('verify-email/:token')
  async verifyEmail(
    @Param('token') token: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    this.logger.log(
      `Email verification attempt with token: ${token.substring(0, 10)}...`,
    );

    const user: ValidatedUser = await this.authService.verifyEmailToken(token);

    this.logger.log(`User ${user.email} verified. Logging in...`);
    const tokens = await this.authService.login(user);
    this.setAuthCookies(response, tokens);

    const frontendUrl = this.configService.get<string>(
      'FRONTEND_URL',
      'http://localhost:3000',
    );

    if (!user.username) {
      this.logger.log(
        `User ${user.id} needs to set username. Redirecting to /choose-username`,
      );
      response.redirect(`${frontendUrl}/choose-username`);
    } else if (!user.hasCompletedOnboarding) {
      if (user.role === 'CREATOR') {
        this.logger.log(
          `Creator ${user.id} has username but needs to complete onboarding steps. Redirecting to /onboarding/creator/step-1`,
        );
        response.redirect(`${frontendUrl}/onboarding/creator/step-1`);
      } else {
        // Fans should be marked complete by setUsername, but if not, send them to dashboard or fallback
        const dashboard = `/@${user.username}/fan-desktop/explore`;
        response.redirect(`${frontendUrl}${dashboard}`);
      }
    } else {
      const dashboard =
        user.role === 'CREATOR'
          ? `/@${user.username}/creator-desktop`
          : `/@${user.username}/fan-desktop/explore`;
      this.logger.log(
        `User ${user.id} has completed onboarding. Redirecting to ${dashboard}`,
      );
      response.redirect(`${frontendUrl}${dashboard}`);
    }
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Req() req: Request,
    @Body() body: RefreshTokenDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ accessToken: string }> {
    const cookies = req.cookies as Record<string, string>;
    const incomingRefreshToken = (cookies?.['refresh_token'] ||
      body.refreshToken) as string;

    if (!incomingRefreshToken) {
      this.logger.warn(
        'Refresh token endpoint called without a refresh token.',
      );
      throw new UnauthorizedException('Brak refresh tokena.');
    }

    let userIdFromToken: string;
    try {
      const decoded = this.jwtService.verify<JwtPayload>(incomingRefreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });
      userIdFromToken = decoded.sub;
    } catch {
      this.logger.warn(
        'Invalid refresh token presented at /refresh-token endpoint (verification failed). Clearing cookies.',
      );
      this.clearAuthCookies(response);
      throw new UnauthorizedException(
        'Nieprawidłowy lub wygasły refresh token.',
      );
    }

    if (!userIdFromToken) {
      this.logger.error('Refresh token decoded, but userId (sub) is missing.');
      this.clearAuthCookies(response);
      throw new UnauthorizedException('Nieprawidłowy format refresh tokena.');
    }

    this.logger.log(`Refresh token request for user ID: ${userIdFromToken}.`);
    const newTokens = await this.authService.refreshToken(
      userIdFromToken,
      incomingRefreshToken,
    );
    this.setAuthCookies(response, newTokens);
    return { accessToken: newTokens.accessToken };
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message: string }> {
    const user = req.user as ValidatedUser;
    this.logger.log(`Logout request for user ID: ${user.id}.`);
    await this.authService.logout(user.id);
    this.clearAuthCookies(response);
    return { message: 'Wylogowano pomyślnie.' };
  }
}
