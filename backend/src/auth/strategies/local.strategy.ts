// TipJar/backend/src/auth/strategies/local.strategy.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService, ValidatedUser } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private authService: AuthService) {
    super({
      usernameField: 'email', // Określa, że pole 'username' w żądaniu to 'email'
    });
  }

  async validate(email: string, pass: string): Promise<ValidatedUser> {
    this.logger.debug(`LocalStrategy: Validating user ${email}`);
    const user = await this.authService.validateUserByPassword(email, pass);
    if (!user) {
      this.logger.warn(`LocalStrategy: Invalid credentials for ${email}.`);
      throw new UnauthorizedException('Nieprawidłowe dane logowania.');
    }
    this.logger.log(`LocalStrategy: User ${email} (ID: ${user.id}) validated successfully.`);
    return user; // Zwrócony obiekt zostanie dołączony do `req.user`
  }
}
