import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '.env') });

// DODANE: debug — pokaż realną wartość zmiennej, z której Prisma korzysta
console.log('📡 DATABASE_URL:', process.env.DATABASE_URL);

import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$queryRaw`SELECT 1`;
  console.log('✅ DB connection OK:', result);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
