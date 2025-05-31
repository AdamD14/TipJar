// TipJar/backend/src/auth/strategies/jwt-refresh.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UserRole } from '../../../generated/prisma'; // Zakładając poprawną ścieżkę

export interface JwtRefreshPayload {
  sub: string;
  email: string | null;
  role: UserRole;
  displayName: string;
}

export interface ValidatedRefreshUser extends JwtRefreshPayload {
  refreshToken: string;
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  private readonly logger = new Logger(JwtRefreshStrategy.name);

  constructor(
    private configService: ConfigService,
  ) {
    const jwtRefreshSecret = configService.get<string>('JWT_REFRESH_TOKEN_SECRET');

    // === WYWOŁANIE SUPER() JAKO PIERWSZE ===
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      // Alternatywnie z ciasteczka:
      // jwtFromRequest: (req: Request) => req.cookies?.['refresh_token'] || null,
      secretOrKey: jwtRefreshSecret || 'fallbackRefreshSecretIfNotSet', // Fallback, ale powinno być w .env
      passReqToCallback: true,
    });
    // === KONIEC WYWOŁANIA SUPER() ===

    // Sprawdzenie konfiguracji PO wywołaniu super()
    if (!jwtRefreshSecret) {
      // Użycie this.logger jest teraz bezpieczne
      this.logger.error('CRITICAL: JWT_REFRESH_TOKEN_SECRET is not defined in .env file. Refresh token strategy will not function.');
      throw new Error('JWT_REFRESH_TOKEN_SECRET is not defined in .env file.');
    }
  }

  async validate(req: Request, payload: JwtRefreshPayload): Promise<ValidatedRefreshUser> {
    const refreshToken = req.body.refreshToken || req.cookies?.['refresh_token'];
    this.logger.debug(`JwtRefreshStrategy: Validating refresh token payload for user ID: ${payload.sub}`);

    if (!refreshToken) {
        this.logger.warn('JwtRefreshStrategy: No refresh token found in request.');
        throw new UnauthorizedException('Brak refresh tokena w żądaniu.');
    }
    if (!payload.sub || !payload.role || !payload.displayName) {
        this.logger.warn(`JwtRefreshStrategy: Invalid refresh token payload structure for user ID: ${payload.sub}.`);
        throw new UnauthorizedException('Nieprawidłowy format refresh tokena.');
    }
    
    return { 
        sub: payload.sub, 
        email: payload.email, 
        role: payload.role,
        displayName: payload.displayName,
        refreshToken: refreshToken 
    };
  }
}