// Modified version of TipJar/backend/src/app.module.ts
// This file adds FanModule into the root module imports.  It is
// intended to be copied over your existing app.module.ts to enable
// the new fan API endpoints.

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// Mailer
import { MailerModule } from '@nestjs-modules/mailer';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RedisModule } from './shared/redis/redis.module';
import { GeneratorModule } from './generator/generator.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CircleModule } from './circle/circle.module';
import { TipsModule } from './tips/tips.module';
import { PayoutsModule } from './payouts/payouts.module';
import { NotificationModule } from './notification/notification.module';

// Newly added FanModule
import { FanModule } from './fan/fan.module';

@Module({
  imports: [
    // Make .env configuration available everywhere
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Core modules
    PrismaModule,
    RedisModule,

    // Mailer configuration
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('MAIL_HOST'),
          port: parseInt(config.get<string>('MAIL_PORT', '587'), 10),
          secure: config.get<string>('MAIL_SECURE', 'false') === 'true',
          auth: {
            user: config.get<string>('MAIL_USER'),
            pass: config.get<string>('MAIL_PASS'),
          },
        },
        defaults: {
          from: `"${config.get<string>('MAIL_FROM_NAME', 'TipJar Platform')}" <${config.get<string>('MAIL_FROM_ADDRESS', 'noreply@tipjar.example.com')}>`,
        },
      }),
      inject: [ConfigService],
    }),

    // Feature modules
    AuthModule,
    UsersModule,
    CircleModule,
    TipsModule,
    PayoutsModule,
    NotificationModule,
    // Import the fan module to enable fan endpoints
    FanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
