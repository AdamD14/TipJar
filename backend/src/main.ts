// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // 1. Globalny prefiks dla wszystkich tras API
  app.setGlobalPrefix('api/v1');

  // 2. Włączenie CORS (Cross-Origin Resource Sharing)
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Niezbędne do przesyłania ciasteczek między domenami
  });

  // 3. Obsługa ciasteczek (cookies)
  // Musisz zainstalować: npm install cookie-parser
  app.use(cookieParser());

  // 4. Globalny potok walidacji (ValidationPipe)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Usuwa z requestu pola, których nie ma w DTO
      transform: true, // Automatycznie transformuje typy danych
      forbidNonWhitelisted: true, // Zwraca błąd, jeśli request zawiera niedozwolone pola
      transformOptions: {
        enableImplicitConversion: true, // Umożliwia niejawną konwersję typów
      },
    }),
  );

  // 5. Ograniczenie liczby zapytań (Rate Limiting) - ochrona przed atakami brute-force
  const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minut
    max: 10, // Max 10 prób logowania z jednego IP w ciągu 15 minut
    message: 'Zbyt wiele prób logowania, spróbuj ponownie później.',
    standardHeaders: true, // Dodaje standardowe nagłówki RateLimit-*
    legacyHeaders: false, // Wyłącza niestandardowe nagłówki X-RateLimit-*
  });
  app.use('/api/v1/auth/login', authRateLimiter);
  app.use('/api/v1/auth/register', authRateLimiter);

  // 6. Włączenie "shutdown hooks" dla poprawnego zamykania aplikacji (ważne dla Prismy)
  app.enableShutdownHooks();

  // 7. Uruchomienie serwera
  const port = parseInt(process.env.BACKEND_PORT || '3001', 10);
  await app.listen(port);

  logger.log(
    `🚀 Backend TipJar jest uruchomiony i nasłuchuje na porcie: ${port}`,
  );
  logger.log(`✅ Dostępny pod adresem: http://localhost:${port}/api/v1`);
}

bootstrap();
