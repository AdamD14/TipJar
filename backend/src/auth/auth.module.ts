import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { CircleModule } from '../circle/circle.module';
import { RedisModule } from '../shared/redis/redis.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'; // <<< KROK 1: Dodajemy import
import { join } from 'path'; // <<< KROK 1: Dodajemy import

// Import strategii Passport
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { TwitchStrategy } from './strategies/twitch.strategy';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => UsersModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
            '15m',
          ),
        },
      }),
      inject: [ConfigService],
    }),

    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>('MAIL_HOST', 'smtp.example.com'),
          port: parseInt(config.get<string>('MAIL_PORT', '587'), 10),
          secure: config.get<string>('MAIL_SECURE', 'false') === 'true',
          auth: {
            user: config.get<string>('MAIL_USER'),
            pass: config.get<string>('MAIL_PASS'),
          },
        },
        defaults: {
          from: `"${config.get<string>(
            'MAIL_FROM_NAME',
            'TipJar',
          )}" <${config.get<string>(
            'MAIL_FROM_ADDRESS',
            'noreply@tipjar.com',
          )}>`,
        },
        // <<< KROK 2: Dodajemy konfigurację szablonów
        template: {
          dir: join(__dirname, '..', '..', 'templates'), // Ścieżka do folderu z szablonami
          adapter: new HandlebarsAdapter(), // Używamy adaptera Handlebars
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),

    CircleModule,
    RedisModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    GoogleStrategy,
    TwitchStrategy,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
