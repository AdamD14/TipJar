// TipJar/backend/src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';
import retry from 'async-retry';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();

    // 📊 Logging & metrics (czas trwania zapytania)
    this.$use(async (params, next) => {
      const start = Date.now();
      try {
        const result = await next(params);
        const duration = Date.now() - start;
        console.log(`[Prisma] ${params.model}.${params.action} took ${duration}ms`);
        return result;
      } catch (error) {
        console.error(`[Prisma][Error] ${params.model}.${params.action}:`, error);
        throw error;
      }
    });

    // 🧩 Przykładowy hook: przycinanie displayName przy tworzeniu
    this.$use(async (params, next) => {
      if (params.action === 'create' && params.args?.data?.displayName) {
        params.args.data.displayName = params.args.data.displayName.trim();
      }
      return next(params);
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  // 🔁 Retry logic: do użycia w serwisach np. await prisma.$safeQuery(() => prisma.user.findMany())
  async $safeQuery<T>(query: () => Promise<T>): Promise<T> {
    return await retry(query, {
      retries: 3,
      minTimeout: 100,
      maxTimeout: 500,
    });
  }
}
