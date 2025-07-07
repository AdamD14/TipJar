// TipJar/backend/src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy, INestApplication, Logger } from '@nestjs/common';
// Importuj PrismaClient z poprawnie wygenerowanej lokalizacji
// Zakładając, że schema.prisma jest w backend/prisma/ a output klienta to ../generated/prisma
// to klient jest w backend/generated/prisma
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  declare tip: any;
  declare user: any;
  declare payout: any;
  declare socialConnection: any;
  declare overlaySettings: any;
  private readonly logger = new Logger(PrismaService.name);
  constructor() {
    super({
      // Opcjonalnie: możesz tutaj skonfigurować logowanie zapytań Prisma
      // log: [
      //   { emit: 'stdout', level: 'query' },
      //   { emit: 'stdout', level: 'info' },
      //   { emit: 'stdout', level: 'warn' },
      //   { emit: 'stdout', level: 'error' },
      // ],
      // Opcjonalnie: obsługa błędów
      // errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    // Prisma Client zarządza połączeniami leniwie, ale można jawnie połączyć.
    // To jest dobre miejsce, aby upewnić się, że połączenie z bazą danych działa przy starcie aplikacji.
    try {
      await this.$connect();
      this.logger.log('Successfully connected to the database (Prisma)');
    } catch (error) {
      this.logger.error('Failed to connect to the database (Prisma)', error.stack);
      // Możesz zdecydować, czy aplikacja powinna się zatrzymać, jeśli nie może połączyć się z bazą
      // process.exit(1); 
    }
  }

  async onModuleDestroy() {
    // Zamknij połączenie, gdy aplikacja jest zamykana
    await this.$disconnect();
    this.logger.log('Disconnected from the database (Prisma)');
  }

  // Opcjonalnie: Hook dla graceful shutdown (zalecane)
  // Upewnij się, że masz włączone enableShutdownHooks w main.ts: app.enableShutdownHooks();
  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
