import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class RemindersService {
  private readonly logger = new Logger(RemindersService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async nudgeIncomplete(): Promise<void> {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const users = await this.prisma.user.findMany({
      where: {
        published: false,
        onboardingCompletedAt: null,
        OR: [
          { lastOnboardingEmailAt: null },
          { lastOnboardingEmailAt: { lt: since } },
        ],
      },
      select: { id: true, email: true, username: true },
    });
    let count = 0;
    for (const u of users) {
      if (!u.email) continue;
      try {
        await this.mailer.sendMail({
          to: u.email,
          subject: 'Finish your TipJar+ profile in 5 minutes',
          text: `Hi @${u.username || 'creator'}, finish your onboarding: ${
            process.env.SITE_URL || 'http://localhost:3000'
          }/creator/onboarding`,
        });
        await this.prisma.user.update({
          where: { id: u.id },
          data: { lastOnboardingEmailAt: new Date() },
        });
        count++;
      } catch (e) {
        this.logger.warn(`Failed to email ${u.email}: ${(e as Error).message}`);
      }
    }
    if (count > 0) this.logger.log(`Sent ${count} onboarding nudges`);
  }
}
