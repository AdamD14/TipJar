import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/guards/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Controller('circle')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CircleConnectController {
  constructor(private prisma: PrismaService) {}

  @Post('connect')
  @Roles(UserRole.CREATOR, UserRole.ADMIN)
  async connect(@Req() req: any) {
    const userId = req.user?.id as string;
    const state = `${userId}.${Date.now()}`;
    const site = process.env.SITE_URL || 'http://localhost:3000';
    const cb = `${site}/api/v1/circle/callback`;
    const redirectUrl = `https://example.circle.com/onramp?state=${encodeURIComponent(
      state,
    )}&return_url=${encodeURIComponent(cb)}`;
    return { redirectUrl };
  }

  @Get('callback')
  async callback(@Req() req: any, @Res() res: any) {
    const { state, success } = req.query as {
      state?: string;
      success?: string;
    };
    const userId = String(state || '').split('.')[0];
    const site = process.env.SITE_URL || 'http://localhost:3000';
    if (success === 'true' && userId) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { paymentConnected: true },
      });
      return res.redirect(`${site}/creator/onboarding/step-5-publish`);
    }
    return res.redirect(`${site}/creator/onboarding/step-4-payments?error=1`);
  }
}
