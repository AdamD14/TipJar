// TipJar/backend/src/prisma/prisma.module.ts
import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Oznacza moduł jako globalny, dzięki czemu PrismaService będzie dostępny wszędzie
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Eksportuj PrismaService, aby inne moduły mogły go wstrzykiwać
})
export class PrismaModule {}
