import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FanOnboardingStep2Dto } from './dto/fan-onboarding.dto';

@Injectable()
export class FanOnboardingService {
  constructor(private readonly prisma: PrismaService) {}

  async saveStep2(userId: string, dto: FanOnboardingStep2Dto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        interests: dto.interests,
        hasCompletedOnboarding: true, // Mark onboarding as complete after this step
      },
    });
  }
}
