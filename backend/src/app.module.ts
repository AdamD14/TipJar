// TipJar/backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // ConfigService będzie potrzebny dla MailerModule

// Import MailerModule
import { MailerModule } from '@nestjs-modules/mailer';
// import { join } from 'path'; // Odkomentuj, jeśli będziesz używał szablonów Handlebars
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

// Główne moduły aplikacji
import { AppController } from './app.controller'; // Zakładając, że masz ten plik
import { AppService } from './app.service';     // Zakładając, że masz ten plik
import { PrismaModule } from './prisma/prisma.module';   // Twój moduł Prisma
import { AuthModule } from './auth/auth.module';       // Twój moduł Auth
import { UsersModule } from './users/users.module';     // Twój moduł Users
import { CircleModule } from './circle/circle.module';   // Twój moduł Circle
import { TipsModule } from './tips/tips.module';    // Moduł Napiwków
import { RedisModule } from './shared/redis/redis.module'; // Załóżmy, że masz ten moduł i jest on @Global

@Module({
  imports: [
    // 1. ConfigModule jako pierwszy, aby zmienne .env były dostępne wszędzie
    ConfigModule.forRoot({
      isGlobal: true,      // Udostępnia ConfigService w całej aplikacji
      envFilePath: '.env', // Ścieżka do pliku .env (z głównego katalogu backendu)
    }),

    // 2. Twoje globalne moduły serwisowe
    PrismaModule, // Zakładając, że PrismaModule jest @Global
    RedisModule,  // Zakładając, że RedisModule jest @Global (potrzebny dla AuthModulex)

    // === DODAJ KONFIGURACJĘ MAILERMODULE TUTAJ ===
    MailerModule.forRootAsync({
      imports: [ConfigModule], // Aby MailerModule miał dostęp do ConfigService
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>('MAIL_HOST'), // np. smtp.gmail.com
          port: parseInt(config.get<string>('MAIL_PORT', '587'), 10),
          secure: config.get<string>('MAIL_SECURE', 'false') === 'true', // Dla Gmaila i portu 587 to false (STARTTLS)
          auth: {
            user: config.get<string>('MAIL_USER'), // np. plustipjar@gmail.com
            pass: config.get<string>('MAIL_PASS'), // Hasło aplikacji dla plustipjar@gmail.com
          },
          // Możesz potrzebować `service: 'gmail'` jeśli standardowa konfiguracja host/port nie działa od razu
          // service: config.get<string>('MAIL_SERVICE'),
        },
        defaults: {
          from: `"${config.get<string>('MAIL_FROM_NAME', 'TipJar Platform')}" <${config.get<string>('MAIL_FROM_ADDRESS', 'noreply@tipjar.example.com')}>`,
        },
        // Opcjonalne szablony (jeśli będziesz ich używać)
        // template: {
        //   dir: join(__dirname, '..', 'templates', 'email'), // Tworzysz folder np. src/templates/email
        //   adapter: new HandlebarsAdapter(),
        //   options: {
        //     strict: true,
        //   },
        // },
      }),
      inject: [ConfigService], // Wstrzyknij ConfigService do useFactory
    }),
    // ============================================

    // 3. Moduły poszczególnych funkcjonalności aplikacji
    AuthModule,    // AuthModule będzie teraz mógł importować MailerModule (bez .forRootAsync)
    UsersModule,
    CircleModule,
    TipsModule,
  ],
  controllers: [AppController], // Jeśli masz AppController
  providers: [AppService],   // Jeśli masz AppService
})
export class AppModule {}