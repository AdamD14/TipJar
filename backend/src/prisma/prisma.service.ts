// backend/src/prisma/prisma.service.ts
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    // Prisma 7 wymaga Driver Adaptera dla bezpośrednich połączeń
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);

    super({ adapter });
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.$connect();
      this.logger.log('Successfully connected to the database (Prisma)');
    } catch (err) {
      this.logger.error(
        'Failed to connect to the database (Prisma)',
        (err as Error)?.stack,
      );
      throw err;
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    this.logger.log('Disconnected from the database (Prisma)');
  }
}
