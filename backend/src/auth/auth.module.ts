// TipJar/backend/src/auth/auth.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; // ConfigModule jest tu potrzebny dla MailerModule i JwtModule
import { UsersModule } from '../users/users.module';
import { CircleModule } from '../circle/circle.module';
import { RedisModule } from '../shared/redis/redis.module';

// === UPEWNIJ SIĘ, ŻE TEN IMPORT JEST OBECNY ===
import { MailerModule } from '@nestjs-modules/mailer';
// Jeśli używasz szablonów Handlebars, dodaj też:
// import { join } from 'path';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

// Import strategii Passport
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { TwitchStrategy } from './strategies/twitch.strategy';
import { SiweVerifier } from './strategies/siwe.verifier';

@Module({
  imports: [
    ConfigModule, // Potrzebny, aby ConfigService był dostępny dla useFactory
    forwardRef(() => UsersModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION_TIME', '15m'),
        },
      }),
      inject: [ConfigService],
    }),

    // === ODKOMENTUJ I SKONFIGURUJ MailerModule TUTAJ ===
    MailerModule.forRootAsync({
      imports: [ConfigModule], // MailerModule również potrzebuje ConfigService
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('MAIL_HOST', 'smtp.example.com'),
          port: parseInt(config.get<string>('MAIL_PORT', '587'), 10),
          secure: config.get<string>('MAIL_SECURE', 'false') === 'true', // false dla portu 587 (STARTTLS), true dla 465
          auth: {
            user: config.get<string>('MAIL_USER'),
            pass: config.get<string>('MAIL_PASS'),
          },
          // Możesz potrzebować dodatkowych opcji dla swojego dostawcy SMTP, np. dla Gmaila:
          // service: 'gmail', 
        },
        defaults: {
          from: `"${config.get<string>('MAIL_FROM_NAME', 'TipJar')}" <${config.get<string>('MAIL_FROM_ADDRESS', 'noreply@tipjar.com')}>`,
        },
        // Opcjonalnie, jeśli chcesz używać szablonów email (np. Handlebars)
        // template: {
        //   dir: join(__dirname, '..', '..', 'templates', 'email'), // Ścieżka do folderu z szablonami
        //   adapter: new HandlebarsAdapter(),
        //   options: {
        //     strict: true,
        //   },
        // },
      }),
      inject: [ConfigService],
    }),
    // ====================================================

    CircleModule, // Zakładając, że jest @Global lub poprawnie skonfigurowany
    RedisModule,  // Zakładając, że jest @Global lub poprawnie skonfigurowany
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    GoogleStrategy,
    TwitchStrategy,
    SiweVerifier,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
