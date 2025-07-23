import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller'; // <<< KROK 1: Importujemy kontroler
import { PrismaModule } from '../prisma/prisma.module'; // <<< KROK 2: Importujemy PrismaModule, aby serwis miał dostęp do bazy

@Module({
  imports: [PrismaModule], // <<< KROK 3: Dodajemy PrismaModule
  providers: [UsersService],
  controllers: [UsersController], // <<< KROK 4: Rejestrujemy kontroler
  exports: [UsersService],
})
export class UsersModule {}
