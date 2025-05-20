// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common'; // Dodaj import Logger

async function bootstrap() {
  const logger = new Logger('Bootstrap'); // Utwórz instancję Loggera
  const app = await NestFactory.create(AppModule);

  // Ustaw globalny prefix dla wszystkich endpointów API, np. /api/v1
  app.setGlobalPrefix('api/v1');

  // Włącz globalną walidację dla DTOs używając ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Automatycznie usuwa właściwości, które nie są zdefiniowane w DTO
      transform: true, // Automatycznie transformuje przychodzący payload do instancji DTO (np. string do number)
      forbidNonWhitelisted: true, // Rzuca błąd, jeśli w payloadzie są właściwości nie zdefiniowane w DTO
      transformOptions: {
        enableImplicitConversion: true, // Umożliwia transformację typów na podstawie metadanych TypeScript
      },
    }),
  );

  // Włącz CORS (Cross-Origin Resource Sharing)
  // To jest kluczowe, aby frontend (działający na innym porcie/domenie) mógł komunikować się z backendem
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // URL Twojego frontendu (z .env)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Pozwala na przesyłanie ciasteczek i nagłówków autoryzacyjnych
  });

  const port = process.env.BACKEND_PORT || 3001; // Port z .env
  await app.listen(port);
  logger.log(`Backend TipJar działa na porcie: ${port}`); // Użyj loggera NestJS
}
bootstrap();