// src/onboarding/onboarding.module.ts
import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module';

import { OnboardingController } from './onboarding.controller';
import { OnboardingService } from './onboarding.service';

@Module({
  imports: [
    PrismaModule,
    CloudinaryModule,
    // Multer został usunięty
  ],
  controllers: [OnboardingController],
  providers: [OnboardingService],
  exports: [OnboardingService],
})
export class OnboardingModule {}
