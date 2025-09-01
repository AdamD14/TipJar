import { Module } from '@nestjs/common';
import { CreatorOnboardingController } from './onboarding.controller';

@Module({ controllers: [CreatorOnboardingController] })
export class CreatorOnboardingModule {}

