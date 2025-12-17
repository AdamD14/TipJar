import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import {
  CreatorStep1Dto,
  CreatorStep2Dto,
  CreatorStep3Dto,
  CreatorStep4Dto,
} from './dto/creator-onboarding.dto';

@Injectable()
export class OnboardingService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService, // Use if needed or for direct calls
  ) {}

  async getCreatorStatus(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        mediaRecords: {
          orderBy: { createdAt: 'desc' },
          take: 3,
        },
      },
    });

    if (!user) throw new BadRequestException('User not found');

    const steps: number[] = [];
    if (user.profile?.industry) steps.push(1);
    // basic checks
    if (user.profile?.goalTarget) steps.push(4);
    if (user.hasCompletedOnboarding) steps.push(5);

    // Map media records to public URLs
    const avatarUrls = user.mediaRecords
      .map((r) => r.publicUrl)
      .filter(Boolean);

    return {
      completedSteps: steps,
      profile: user.profile,
      avatarUrl: avatarUrls[0] || user.avatarUrl, // fallback
      avatarUrls: avatarUrls, // New field for carousel
    };
  }

  async saveCreatorStep1(userId: string, dto: CreatorStep1Dto) {
    // Save avatarUrl to User model as requested ("Avatar przechowuj w User.avatarUrl") - REMOVED per request

    return this.prisma.profile.upsert({
      where: { userId },
      create: {
        userId,
        industry: dto.industry,
      },
      update: {
        industry: dto.industry,
      },
    });
  }

  async saveCreatorStep2(userId: string, dto: CreatorStep2Dto) {
    if (!dto.avatarUrl) return;

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        avatarUrl: dto.avatarUrl,
      },
    });
  }

  async saveCreatorStep3(userId: string, dto: CreatorStep3Dto) {
    return this.prisma.profile.upsert({
      where: { userId },
      create: {
        userId,
        bio: dto.bio,
        websiteUrl: dto.websiteUrl,
      },
      update: {
        bio: dto.bio,
        websiteUrl: dto.websiteUrl,
      },
    });
  }

  async saveCreatorStep4(userId: string, dto: CreatorStep4Dto) {
    return this.prisma.profile.upsert({
      where: { userId },
      create: {
        userId,
        goalLabel: dto.goalLabel,
        goalTarget: dto.goalTarget,
      },
      update: {
        goalLabel: dto.goalLabel,
        goalTarget: dto.goalTarget,
      },
    });
  }

  // Legacy/Other methods
  async completeOnboarding(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        hasCompletedOnboarding: true,
        onboardingCompletedAt: new Date(),
      },
    });
  }
}
