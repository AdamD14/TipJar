import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../auth/guards/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { PrismaService } from '../../prisma/prisma.service';
import { UserRole } from '@prisma/client';

type Steps = {
  identity: boolean;
  bio: boolean;
  tiers: boolean;
  payments: boolean;
  publish: boolean;
};

function stepsToCompletion(steps: Steps) {
  const total = Object.keys(steps).length; const done = Object.values(steps).filter(Boolean).length; return Math.round((done/total)*100);
}

@Controller('creator/onboarding')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(UserRole.CREATOR, UserRole.ADMIN)
export class CreatorOnboardingController {
  constructor(private prisma: PrismaService) {}

  @Get('status')
  async status(@Req() req: any) {
    const u = await this.prisma.user.findUnique({ where: { id: req.user.id }, include: { profile: { select: { bio: true } } } });
    const consents: any = (u as any)?.consents || {};
    const steps: Steps = {
      identity: !!(u?.username && u?.avatarUrl),
      bio: !!(u?.displayName && (u as any)?.profile?.bio),
      tiers: !!consents?.hasTier, // placeholder; w przyszłości: liczba aktywnych tierów
      payments: !!u?.paymentConnected,
      publish: !!u?.published,
    };
    const order = ['identity','bio','tiers','payments','publish'] as const;
    const nextStep = (order.find(k => !steps[k]) ?? 'publish');
    return {
      steps,
      completion: stepsToCompletion(steps),
      nextStep,
      username: u?.username,
      avatarUrl: u?.avatarUrl,
      paymentConnected: u?.paymentConnected,
      published: u?.published,
    };
  }

  @Patch('identity')
  async identity(@Req() req: any, @Body() dto: { username?: string; avatarUrl?: string; coverUrl?: string }) {
    await this.prisma.user.update({ where: { id: req.user.id }, data: { username: dto.username ?? undefined, avatarUrl: dto.avatarUrl ?? undefined } });
    return { ok: true };
  }

  @Patch('bio')
  async bio(@Req() req: any, @Body() dto: { displayName: string; bio: string; socials?: any }) {
    // Update display name on user
    const current = await this.prisma.user.findUnique({ where: { id: req.user.id }, select: { consents: true } });
    await this.prisma.user.update({ where: { id: req.user.id }, data: { displayName: dto.displayName, consents: { ...(current?.consents as any || {}), socials: dto.socials ?? {} } as any } as any });
    // Upsert profile bio
    await this.prisma.profile.upsert({
      where: { userId: req.user.id },
      update: { bio: dto.bio },
      create: { userId: req.user.id, bio: dto.bio },
    });
    return { ok: true };
  }

  @Post('tier')
  async tier(@Req() req: any, @Body() dto: { id?: string; name: string; priceCents: number; perks: string[]; active: boolean }) {
    // Placeholder: oznacz posiadanie aktywnego tieru w JSON consents
    const current = await this.prisma.user.findUnique({ where: { id: req.user.id }, select: { consents: true } });
    const next = { ...(current?.consents as any || {}), hasTier: !!dto.active };
    await this.prisma.user.update({ where: { id: req.user.id }, data: { consents: next } });
    return { ok: true, id: dto.id || 'tier-placeholder' };
  }

  @Patch('payments')
  async payments(@Req() req: any, @Body() dto: { connected: boolean }) {
    await this.prisma.user.update({ where: { id: req.user.id }, data: { paymentConnected: !!dto.connected } });
    return { ok: true };
  }

  @Post('publish')
  async publish(@Req() req: any, @Body() dto: { publish: boolean }) {
    await this.prisma.user.update({ where: { id: req.user.id }, data: { published: !!dto.publish } });
    return { ok: true };
  }
}
