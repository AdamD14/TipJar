import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CircleService } from '../circle/circle.service';
import { MailerService } from '@nestjs-modules/mailer';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,

        { provide: CircleService, useValue: {} },
        { provide: MailerService, useValue: {} },
        { provide: 'REDIS_CLIENT', useValue: {} },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate tokens', async () => {
    const user: ValidatedUser = {
      id: '1',
      email: 'test@example.com',
      role: UserRole.FAN,
      displayName: 'Test',
      isEmailVerified: true,
      isActive: true,
    };

    const tokens = await (service as any)['generateTokens'](user);
    expect(typeof tokens.accessToken).toBe('string');
    expect(typeof tokens.refreshToken).toBe('string');
  });
});
