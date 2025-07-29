// TipJar/backend/src/auth/strategies/jwt.strategy.ts

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ValidatedUser } from '../auth.service';
import { UserRole } from '@prisma/client';
import { Request } from 'express';

export interface JwtAccessPayload {
  sub: string;
  email: string | null;
  role: UserRole;
  displayName: string;
  isEmailVerified: boolean;
  isActive: boolean;
}

// Funkcja pomocnicza, która wyciąga token z ciasteczka
const cookieExtractor = (req: Request): string | null => {
  // <<< POPRAWKA TUTAJ
  if (req && req.cookies) {
    // Mówimy TypeScriptowi, że `cookies` to obiekt typu klucz:wartość (string:string)
    // Dzięki temu dostęp do `['access_token']` jest już bezpieczny.
    const cookies = req.cookies as Record<string, string>;
    return cookies['access_token'] || null;
  }
  return null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private configService: ConfigService) {
    const jwtAccessSecret = configService.get<string>(
      'JWT_ACCESS_TOKEN_SECRET',
    );
    if (!jwtAccessSecret) {
      throw new Error('JWT_ACCESS_TOKEN_SECRET is not defined in .env file.');
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        cookieExtractor,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtAccessSecret,
    });
  }

  validate(payload: JwtAccessPayload): ValidatedUser {
    this.logger.debug(
      `JwtStrategy: Validating JWT access payload for user ID: ${payload.sub}`,
    );

    if (
      !payload.sub ||
      !payload.role ||
      !payload.displayName ||
      typeof payload.isEmailVerified !== 'boolean' ||
      typeof payload.isActive !== 'boolean'
    ) {
      this.logger.warn(
        `JwtStrategy: Invalid JWT access payload structure for user ID: ${payload.sub}.`,
      );
      throw new UnauthorizedException(
        'Nieprawidłowy lub niekompletny token dostępowy.',
      );
    }

    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      displayName: payload.displayName,
      isEmailVerified: payload.isEmailVerified,
      isActive: payload.isActive,
    };
  }
}
