// TipJar/backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // <<< UPEWNIJ SIĘ, ŻE IMPORTUJESZ I UŻYWASZ AppModule
import { ValidationPipe, Logger, HttpException, HttpStatus } from '@nestjs/common';
import rateLimit from 'express-rate-limit';
// import { PrismaService } from './prisma/prisma.service'; // Niepotrzebne tutaj, jeśli używasz enableShutdownHooks

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule); // <<< UŻYJ AppModule

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Rate Limiting
  const authRateLimiter = rateLimit({ /* ... konfiguracja ... */ });
  app.use('/api/v1/auth/login', authRateLimiter);
  // ... inne limitery ...

  app.enableShutdownHooks(); // Ważne dla PrismaService.onModuleDestroy i innych lifecycle hooks

  const port = parseInt(process.env.BACKEND_PORT || '3001', 10);
  await app.listen(port);
  logger.log(`Backend TipJar jest uruchomiony i nasłuchuje na porcie: ${port}`);
  logger.log(`Dostępny pod adresem: http://localhost:${port}/api/v1`);
}
bootstrap();