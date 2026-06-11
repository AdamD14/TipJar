import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, Tip, TipStatus } from '@prisma/client';
import { Blockchain } from '@circle-fin/developer-controlled-wallets';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { CircleService } from '../circle/circle.service';
import { NotificationService } from '../notification/notification.service';
import { randomUUID } from 'crypto';

export interface PublicTipRow {
  id: string;
  amount: string;
  message: string | null;
  isAnonymous: boolean;
  createdAt: string;
  fan: {
    id: string;
    username: string | null;
    displayName: string | null;
    avatarUrl: string | null;
  } | null;
}

export interface ProcessTipParams {
  amount: string;
  creatorId: string;
  fanId: string | null;
  message?: string;
  isAnonymous?: boolean;
  paymentGatewayToken?: string;
}

@Injectable()
export class TipsService {
  private readonly logger = new Logger(TipsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly circleService: CircleService,
    private readonly notificationService: NotificationService,
    private readonly config: ConfigService,
  ) {}

  private readonly FEE_BPS = 250;

  async getPublicTipsForCreator(
    creatorId: string,
    page = 1,
    limit = 20,
  ): Promise<{ tips: Array<PublicTipRow>; total: number }> {
    const skip = (page - 1) * limit;
    const where = {
      creatorId,
      status: TipStatus.COMPLETED,
    };

    const [rows, total] = await Promise.all([
      this.prisma.tip.findMany({
        where,
        select: {
          id: true,
          amount: true,
          message: true,
          isAnonymous: true,
          createdAt: true,
          fan: {
            select: {
              id: true,
              username: true,
              displayName: true,
              avatarUrl: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.tip.count({ where }),
    ]);

    const tips = rows.map((r) => ({
      id: r.id,
      amount: r.amount.toString(),
      message: r.message,
      isAnonymous: r.isAnonymous,
      createdAt: r.createdAt.toISOString(),
      fan: r.isAnonymous
        ? null
        : r.fan
          ? {
              id: r.fan.id,
              username: r.fan.username,
              displayName: r.fan.displayName,
              avatarUrl: r.fan.avatarUrl,
            }
          : null,
    }));

    return { tips, total };
  }

  async getGoalProgressForCreator(
    creatorId: string,
  ): Promise<{ totalReceived: string; tipCount: number }> {
    const result = await this.prisma.tip.aggregate({
      _sum: { amount: true },
      _count: true,
      where: {
        creatorId,
        status: TipStatus.COMPLETED,
      },
    });

    return {
      totalReceived: (result._sum.amount ?? new Prisma.Decimal(0)).toString(),
      tipCount: result._count,
    };
  }

  async processNewTip(params: ProcessTipParams): Promise<Tip> {
    const {
      amount,
      creatorId,
      fanId,
      message,
      isAnonymous,
      paymentGatewayToken,
    } = params;

    const amountDecimal = new Prisma.Decimal(amount);
    const feeBps = this.FEE_BPS;
    const platformFeeAmount = amountDecimal
      .mul(feeBps)
      .div(10000)
      .toDecimalPlaces(6, Prisma.Decimal.ROUND_DOWN);
    const netAmountForCreator = amountDecimal
      .sub(platformFeeAmount)
      .toDecimalPlaces(6, Prisma.Decimal.ROUND_DOWN);

    const tip = await this.prisma.tip.create({
      data: {
        amount: amountDecimal,
        creatorId,
        fanId,
        message,
        isAnonymous: isAnonymous ?? false,
        status: TipStatus.PENDING,
        platformFeeAmount,
        netAmountForCreator,
      },
    });

      try {
      if (fanId) {
        const creator = await this.usersService.findOneById(creatorId);
        const fan = await this.usersService.findOneById(fanId);
        if (!creator || !fan) {
          throw new Error('Creator or fan not found');
        }
        if (!creator.circleWalletId || !fan.circleWalletId) {
          throw new Error('Missing Circle wallet for creator or fan');
        }
        const blockchain = this.config.get<string>(
          'DEFAULT_BLOCKCHAIN',
        ) as Blockchain;
        const tokenId = this.circleService.getTokenIdForChain();
        const transfer = await this.circleService.initiateInternalTipTransfer(
          fan.circleWalletId,
          creator.circleWalletId,
          amountDecimal.toString(),
          blockchain,
          tokenId,
        );

        await this.prisma.tip.update({
          where: { id: tip.id },
          data: {
            circleTransferId: transfer.circleTransactionId,
            blockchainTransactionHash: transfer.txHash ?? null,
          },
        });
      }
      const chargeId = randomUUID();
        const completed = await this.prisma.tip.update({
          where: { id: tip.id },
          data: {
            status: TipStatus.COMPLETED,
            paymentGatewayChargeId: chargeId,
            processedAt: new Date(),
          },
        });

        return completed;
    } catch (error) {
      await this.prisma.tip.update({
        where: { id: tip.id },
        data: {
          status: TipStatus.FAILED,
        },
      });
      this.logger.error(
        `Failed to process tip ${tip.id}: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw new InternalServerErrorException(
        'Nie udało się przetworzyć napiwku.',
      );
    }
  }
}
