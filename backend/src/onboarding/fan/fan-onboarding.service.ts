import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FanOnboardingStep2Dto } from './dto/fan-onboarding.dto';

@Injectable()
export class FanOnboardingService {
  constructor(private readonly prisma: PrismaService) {}

  async saveStep2(userId: string, dto: FanOnboardingStep2Dto) {
    const updateData: any = {
      interests: dto.interests,
      hasCompletedOnboarding: true, // Mark onboarding as complete after this step
    };

    if (dto.displayName) {
      updateData.displayName = dto.displayName;
    }

    if (dto.avatarUrl) {
      updateData.avatarUrl = dto.avatarUrl;
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }
}
