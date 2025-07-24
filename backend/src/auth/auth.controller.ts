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
  @UseGuards(AuthGuard('google'))
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
    response.redirect(
      `${this.configService.get<string>(
        'FRONTEND_URL',
        'http://localhost:3000',
      )}/choose-username`,
    );
  }

  @Get('twitch')
  @UseGuards(AuthGuard('twitch'))
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
    response.redirect(
      `${this.configService.get<string>(
        'FRONTEND_URL',
        'http://localhost:3000',
      )}/choose-username`,
    );
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req: Request): ValidatedUser {
    const user = req.user as ValidatedUser;
    this.logger.log(`Fetching profile for authenticated user ID: ${user.id}`);
    return user;
  }

  @Get('verify-email/:token')
  async verifyEmail(
    @Param('token') token: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    this.logger.log(
      `Email verification attempt with token: ${token.substring(0, 10)}...`,
    );

    // POPRAWKA: Jawnie określamy typ `user`
    const user: ValidatedUser = await this.authService.verifyEmailToken(token);

    this.logger.log(`User ${user.email} verified. Logging in...`);
    const tokens = await this.authService.login(user);
    this.setAuthCookies(response, tokens);
    response.redirect(
      `${this.configService.get<string>(
        'FRONTEND_URL',
        'http://localhost:3000',
      )}/choose-username`,
    );
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Req() req: Request,
    @Body() body: RefreshTokenDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ accessToken: string }> {
    // POPRAWKA: Dodajemy bezpieczne typowanie `req.cookies`
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
