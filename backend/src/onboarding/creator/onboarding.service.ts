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
    // Step 1: Archetype selected
    if (user.profile?.archetype) steps.push(1);
    // Step 2: Always allow (avatar uploads in background, will be ready by step 5)
    // User can proceed immediately, upload continues asynchronously
    steps.push(2);
    // Step 3: DisplayName set (checks user.displayName)
    if (user.displayName) steps.push(3);
    // Step 4: Goal set (goalLabel + goalTarget)
    if (user.profile?.goalTarget) steps.push(4);
    if (user.hasCompletedOnboarding) steps.push(5);

    // Map media records to avatar URLs (Cloudinary optimized)
    const avatarUrls = user.mediaRecords
      .map((r) => r.avatarUrl)
      .filter(Boolean);

    return {
      completedSteps: steps,
      profile: user.profile,
      displayName: user.displayName,
      username: user.username,
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

    // Convert specializations array to comma-separated string for industry field
    const specializationsString = dto.specializations?.join(', ') || undefined;

    // Convert connectedSocials to JSON for socials field
    const socialsJson = dto.connectedSocials?.length
      ? Object.fromEntries(dto.connectedSocials.map((s) => [s, true]))
      : undefined;

    return this.prisma.profile.upsert({
      where: { userId },
      create: {
        userId,
        bio: dto.bio || undefined,
        industry: specializationsString,
        socials: socialsJson,
      },
      update: {
        bio: dto.bio || undefined,
        industry: specializationsString,
        socials: socialsJson,
      },
    });
  }

  async saveCreatorStep4(userId: string, dto: CreatorStep4Dto) {
    const deadlineDate = dto.goalDeadline ? new Date(dto.goalDeadline) : null;

    return this.prisma.profile.upsert({
      where: { userId },
      create: {
        userId,
        goalLabel: dto.goalLabel,
        goalTarget: dto.goalTarget,
        goalDeadline: deadlineDate,
      },
      update: {
        goalLabel: dto.goalLabel,
        goalTarget: dto.goalTarget,
        goalDeadline: deadlineDate,
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
