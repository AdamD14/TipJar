// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger, HttpException, HttpStatus } from '@nestjs/common';
import rateLimit from 'express-rate-limit';

// Funkcja bootstrap jest główną funkcją startową aplikacji NestJS
async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Ustawienie globalnego prefixu dla wszystkich endpointów API (np. /api/v1/auth/login)
  app.setGlobalPrefix('api/v1');

  // Włączenie globalnej walidacji dla wszystkich przychodzących żądań przy użyciu ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Usuwa właściwości, które nie są zdefiniowane w DTO
      transform: true, // Automatycznie transformuje payload do instancji DTO
      forbidNonWhitelisted: true, // Rzuca błąd, jeśli payload zawiera niedozwolone właściwości
      transformOptions: {
        enableImplicitConversion: true, // Pozwala na niejawną konwersję typów
      },
    }),
  );

  // Konfiguracja CORS, aby umożliwić żądania z frontendowej części aplikacji
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // URL frontendowej aplikacji
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Pozwala na przesyłanie ciasteczek i nagłówków autoryzacyjnych
  });

  // Konfiguracja Rate Limiter dla ochrony wrażliwych endpointów przed atakami brute-force
  const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Okno czasowe: 15 minut
    max: 10, // Maksymalna liczba żądań z jednego IP w oknie czasowym dla /login
    handler: (req, res, next, options) => {
      throw new HttpException(
        'Zbyt wiele prób logowania z tego adresu IP, spróbuj ponownie za 15 minut.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    },
  });

  // Zastosowanie rate limiting do konkretnych endpointów
  app.use('/api/v1/auth/login', authRateLimiter);
  app.use('/api/v1/auth/register', rateLimit({
    windowMs: 60 * 60 * 1000, // Okno czasowe: 1 godzina
    max: 20, // Maksymalna liczba żądań z jednego IP dla /register
    handler: (req, res, next, options) => {
      throw new HttpException(
        'Zbyt wiele prób rejestracji z tego adresu IP, spróbuj ponownie za godzinę.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    },
  }));

  // Określenie portu, na którym aplikacja będzie nasłuchiwać
  const port = parseInt(process.env.BACKEND_PORT || '3001', 10);
  await app.listen(port);

  // Logowanie informacji o uruchomieniu aplikacji
  logger.log(`Aplikacja jest uruchomiona i nasłuchuje na porcie: ${port}`);
  logger.log(`Dostępna pod adresem: http://localhost:${port}/api/v1`);
  logger.log(`Frontend (CORS) jest skonfigurowany dla: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
}

// Uruchomienie funkcji bootstrap
bootstrap();