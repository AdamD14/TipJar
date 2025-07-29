import { Module } from '@nestjs/common';
import { FanController } from './fan.controller';
import { FanService } from './fan.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CircleModule } from '../circle/circle.module';

/**
 * The FanModule bundles together controller and service definitions
 * providing fan‑specific API endpoints.  It imports PrismaModule
 * for database access and CircleModule to obtain wallet balances.
 */
@Module({
  imports: [PrismaModule, CircleModule],
  controllers: [FanController],
  providers: [FanService],
})
export class FanModule {}
