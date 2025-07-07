// TipJar/backend/src/auth/strategies/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ValidatedUser } from '../auth.service';
import { UserRole } from '@prisma/client';

export interface JwtAccessPayload {
  sub: string;
  email: string | null;
  role: UserRole;
  displayName: string;
  isEmailVerified: boolean;
  isActive: boolean;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private configService: ConfigService,
  ) {
    const jwtAccessSecret = configService.get<string>('JWT_ACCESS_TOKEN_SECRET');

    // === WYWOŁANIE SUPER() JAKO PIERWSZE ===
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtAccessSecret || 'fallbackAccessSecretIfNotSet', // Fallback, ale powinno być w .env
    });
    // === KONIEC WYWOŁANIA SUPER() ===

    // Sprawdzenie konfiguracji PO wywołaniu super()
    if (!jwtAccessSecret) {
      // Użycie this.logger jest teraz bezpieczne
      this.logger.error('CRITICAL: JWT_ACCESS_TOKEN_SECRET is not defined in .env file. JWT strategy will not function.');
      throw new Error('JWT_ACCESS_TOKEN_SECRET is not defined in .env file.');
    }
  }

  async validate(payload: JwtAccessPayload): Promise<ValidatedUser> {
    this.logger.debug(`JwtStrategy: Validating JWT access payload for user ID: ${payload.sub}`);
    
    if (
        !payload.sub || 
        !payload.role || 
        !payload.displayName ||
        typeof payload.isEmailVerified !== 'boolean' ||
        typeof payload.isActive !== 'boolean'
    ) {
        this.logger.warn(`JwtStrategy: Invalid JWT access payload structure for user ID: ${payload.sub}. Missing required fields.`);
        throw new UnauthorizedException('Nieprawidłowy lub niekompletny token dostępowy.');
    }
    
    return { 
        id: payload.sub, 
        email: payload.email, 
        role: payload.role,
        displayName: payload.displayName,
        isEmailVerified: payload.isEmailVerified, 
        isActive: payload.isActive,
        // avatarUrl nie jest w tym payloadzie, więc będzie undefined w ValidatedUser, co jest OK, jeśli jest opcjonalne
    };
  }
}
