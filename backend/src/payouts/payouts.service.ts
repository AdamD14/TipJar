import {
  Injectable,
  Logger,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CircleService } from '../circle/circle.service';
import { Payout, PayoutStatus } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PayoutsService {
  private readonly logger = new Logger(PayoutsService.name);

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    @Inject(forwardRef(() => CircleService))
    private circleService: CircleService,
  ) {}

  async createPayout(
    creatorId: string,
    amount: string,
    destinationAddress: string,
  ): Promise<Payout> {
    const creator = await this.prisma.user.findUnique({
      where: { id: creatorId },
    });
    if (!creator || !creator.circleWalletId) {
      throw new NotFoundException('Creator wallet not configured');
    }

    const payout = await this.prisma.payout.create({
      data: {
        creatorId,
        amount,
        destinationAddress,
        status: PayoutStatus.PENDING,
      },
    });

    try {
      const blockchain = this.configService.get<string>(
        'DEFAULT_BLOCKCHAIN',
        'MATIC-AMOY',
      );
      const tokenId = this.configService.get<string>('USDC_TOKEN_ID', 'USDC');
      const res = await this.circleService.initiateWithdrawal(
        creatorId,
        destinationAddress,
        amount,
        blockchain as any,
        tokenId,
      );

      await this.prisma.payout.update({
        where: { id: payout.id },
        data: {
          circleTransactionId: res.circleTransactionId,
          status: PayoutStatus.PROCESSING,
        },
      });
    } catch (err) {
      this.logger.error(`Payout ${payout.id} failed to initiate`, err as Error);
      await this.prisma.payout.update({
        where: { id: payout.id },
        data: { status: PayoutStatus.FAILED },
      });
      throw err;
    }

    return this.prisma.payout.findUnique({
      where: { id: payout.id },
    }) as Promise<Payout>;
  }

  async getPayoutsForCreator(creatorId: string): Promise<Payout[]> {
    return this.prisma.payout.findMany({
      where: { creatorId },
      orderBy: { requestedAt: 'desc' },
    });
  }

  async getPayoutForCreator(
    creatorId: string,
    payoutId: string,
  ): Promise<Payout> {
    const payout = await this.prisma.payout.findUnique({
      where: { id: payoutId },
    });
    if (!payout || payout.creatorId !== creatorId) {
      throw new NotFoundException('Payout not found');
    }
    return payout;
  }
}
