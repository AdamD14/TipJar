import { Module } from '@nestjs/common';
import { FanOnboardingController } from './fan-onboarding.controller';
import { FanOnboardingService } from './fan-onboarding.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsersModule } from '../../users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [FanOnboardingController],
  providers: [FanOnboardingService],
})
export class FanOnboardingModule {}
