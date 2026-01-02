import { BadRequestException, Injectable } from '@nestjs/common';
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
    // Step 2: At least one avatar fully processed (has avatarUrl from Cloudinary)
    const hasProcessedAvatar = user.mediaRecords.some((r) => r.avatarUrl);
    if (user.avatarUrl || hasProcessedAvatar) steps.push(2);
    // Step 3: Bio filled
    if (user.profile?.bio) steps.push(3);
    // Step 4: Goal set
    if (user.profile?.goalTarget) steps.push(4);
    if (user.hasCompletedOnboarding) steps.push(5);

    // Map media records to avatar URLs (Cloudinary optimized)
    const avatarUrls = user.mediaRecords
      .map((r) => r.avatarUrl)
      .filter(Boolean);

    return {
      completedSteps: steps,
      profile: user.profile,
      avatarUrl: avatarUrls[0] || user.avatarUrl, // fallback
      avatarUrls: avatarUrls, // New field for carousel
    };
  }

  async saveCreatorStep1(userId: string, dto: CreatorStep1Dto) {
    return this.prisma.profile.upsert({
      where: { userId },
      create: {
        userId,
        archetype: dto.archetype,
        industry: dto.industry,
      },
      update: {
        archetype: dto.archetype,
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
    if (dto.displayName) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { displayName: dto.displayName },
      });
    }

    // Convert industries array to comma-separated string for industry field
    const industryString = dto.industries?.join(', ') || undefined;

    // Convert connectedSocials to JSON for socials field
    const socialsJson = dto.connectedSocials
      ? Object.fromEntries(dto.connectedSocials.map((s) => [s, true]))
      : undefined;

    return this.prisma.profile.upsert({
      where: { userId },
      create: {
        userId,
        bio: dto.bio,
        websiteUrl: dto.websiteUrl,
        industry: industryString,
        socials: socialsJson,
      },
      update: {
        bio: dto.bio,
        websiteUrl: dto.websiteUrl,
        industry: industryString,
        socials: socialsJson,
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
