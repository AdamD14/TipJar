// TipJar/backend/src/auth/auth.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module'; // Założenie: UsersModule istnieje i eksportuje UsersService
import { CircleModule } from '../circle/circle.module'; // Założenie: CircleModule istnieje i eksportuje CircleService
import { MailerModule } from '@nestjs-modules/mailer'; // Dla wysyłki emaili (konfiguracja poniżej lub w AppModule)
import { RedisModule } from '../shared/redis/redis.module'; // Założenie: RedisModule istnieje i eksportuje klienta Redis

// Import strategii Passport
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { TwitchStrategy } from './strategies/twitch.strategy';
import { SiweVerifier } from './strategies/siwe.verifier';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule, // Dostęp do zmiennych .env
    PassportModule.register({ defaultStrategy: 'jwt' }), // Domyślna strategia dla @UseGuards(AuthGuard())
    JwtModule.registerAsync({ // Dynamiczna konfiguracja JwtModule
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // Domyślna konfiguracja, np. dla Access Token, ale można ją nadpisać przy sign()
        secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION_TIME', '15m'),
        },
      }),
      inject: [ConfigService],
    }),
    // MailerModule powinien być skonfigurowany, najlepiej globalnie w AppModule
    // Jeśli nie, to tutaj:
    // MailerModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (config: ConfigService) => ({
    //     transport: {
    //       host: config.get('MAIL_HOST'),
    //       port: config.get('MAIL_PORT'),
    //       secure: config.get('MAIL_SECURE') === 'true', // true dla portu 465, false dla innych
    //       auth: {
    //         user: config.get('MAIL_USER'),
    //         pass: config.get('MAIL_PASS'),
    //       },
    //     },
    //     defaults: {
    //       from: `"${config.get('MAIL_FROM_NAME')}" <${config.get('MAIL_FROM_ADDRESS')}>`,
    //     },
    //     // template: { dir: join(__dirname, 'templates'), adapter: new HandlebarsAdapter(), options: { strict: true } },
    //   }),
    //   inject: [ConfigService],
    // }),
    CircleModule, // Zakładając, że CircleModule jest @Global lub eksportuje CircleService
    RedisModule,  // Zakładając, że RedisModule jest @Global lub eksportuje klienta Redis
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
    // Jeśli Redis nie jest w module, można go dostarczyć bezpośrednio:
    // {
    //   provide: 'REDIS_CLIENT',
    //   useFactory: async (configService: ConfigService) => {
    //     const client = createClient({ url: configService.get('REDIS_URL') });
    //     await client.connect();
    //     return client;//   },
    //   inject: [ConfigService],
    // },
  ],
  exports: [AuthService, JwtModule], // JwtModule, aby inne moduły mogły weryfikować tokeny (jeśli potrzebne)
})
export class AuthModule {}