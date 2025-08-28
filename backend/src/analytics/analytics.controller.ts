import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { Roles } from '../auth/guards/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '@prisma/client';
import { ValidatedUser } from '../auth/auth.service';
import { IsIn, IsString } from 'class-validator';

class OnboardingEventDto {
  @IsString()
  @IsIn(['identity', 'bio', 'tiers', 'payments', 'publish'])
  step!: 'identity' | 'bio' | 'tiers' | 'payments' | 'publish';

  @IsString()
  @IsIn(['view', 'save', 'error', 'complete'])
  action!: 'view' | 'save' | 'error' | 'complete';
}

@Controller('analytics')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AnalyticsController {
  constructor(private prisma: PrismaService) {}

  @Post('onboarding')
  @Roles(UserRole.CREATOR, UserRole.ADMIN)
  async track(@Req() req: any, @Body() dto: OnboardingEventDto) {
    const user = req.user as ValidatedUser;
    await this.prisma.onboardingEvent.create({
      data: { userId: user.id, step: dto.step, action: dto.action },
    });
    if (dto.step === 'publish' && dto.action === 'complete') {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { onboardingCompletedAt: new Date(), published: true },
      });
    }
    return { ok: true };
  }
}
