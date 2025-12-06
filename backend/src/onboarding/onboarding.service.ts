import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreatorStep1Dto, CreatorStep2Dto } from './dto/creator-onboarding.dto';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class OnboardingService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService, // Use if needed or for direct calls
  ) {}

  async getCreatorStatus(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user) throw new BadRequestException('User not found');

    const steps: number[] = [];
    if (user.profile?.industry) steps.push(1);
    if (user.profile?.goalTarget) steps.push(2);
    if (user.hasCompletedOnboarding) steps.push(3);

    return {
      completedSteps: steps,
      profile: user.profile,
    };
  }

  async saveCreatorStep1(userId: string, dto: CreatorStep1Dto) {
    // Save avatarUrl to User model as requested ("Avatar przechowuj w User.avatarUrl")
    if (dto.avatarUrl) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { avatarUrl: dto.avatarUrl },
      });
    }

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
    return this.prisma.profile.update({
      where: { userId },
      data: {
        bio: dto.bio,
        goalLabel: dto.goalLabel,
        goalTarget: dto.goalTarget,
        currency: dto.currency ?? 'USDC',
      },
    });
  }
  
  async getUploadUrl(userId: string, _filename: string, _contentType: string) {
    // Generate signature locally using CLOUDINARY_API_SECRET
    // We don't strictly need filename/contentType for a basic unsigned/signed upload preset
    // if we just sign parameters.
    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = 'tipjar/avatars';
    
    const signature = cloudinary.utils.api_sign_request({
      timestamp,
      folder,
      public_id: `${userId}-${Date.now()}`,
    }, process.env.CLOUDINARY_API_SECRET!);

    return {
      url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      signature,
      timestamp,
      folder,
      apiKey: process.env.CLOUDINARY_API_KEY,
      public_id: `${userId}-${Date.now()}`
    };
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