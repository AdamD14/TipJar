import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CircleService } from '../circle/circle.service';

/**
 * FanService encapsulates the business logic for fan–facing
 * operations.  It retrieves a user's managed Circle wallet and
 * delegates to CircleService to fetch the current balance.  The
 * service also exposes a method to fetch a fan's tipping history
 * directly from the database.  Note: no mutation occurs here; it is
 * purely read‑only.
 */
@Injectable()
export class FanService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly circleService: CircleService,
  ) {}

  /**
   * Get the current available USDC balance for the given user.  If
   * the user has not completed Circle wallet setup the method throws
   * NotFoundException.
   *
   * @param userId The internal TipJar user id
   */
  async getWalletBalance(userId: string): Promise<number> {
    const userRecord = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { circleWalletId: true },
    });
    if (!userRecord?.circleWalletId) {
      throw new NotFoundException('Użytkownik nie ma skonfigurowanego portfela Circle.');
    }
    const balance = await this.circleService.getWalletBalance(userRecord.circleWalletId);
    return balance;
  }

  /**
   * Retrieve the list of tips that a given user has sent.  Results
   * are ordered by creation date descending.  Additional filtering or
   * pagination could be added here if required.
   *
   * @param userId The internal TipJar user id
   */
  async getTipsHistory(userId: string) {
    return this.prisma.tip.findMany({
      where: { fromUserId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
