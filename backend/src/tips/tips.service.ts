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
import { randomUUID } from 'crypto';

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
    private readonly config: ConfigService,
  ) {}

  private readonly FEE_BPS = 250;

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
          netAmountForCreator.toString(),
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

        const feeWalletAddress = this.config.get<string>('FEE_WALLET_ADDRESS');
        if (feeWalletAddress && platformFeeAmount.greaterThan(0)) {
          try {
            await this.circleService.transferToAddress(
              fan.circleWalletId,
              feeWalletAddress,
              platformFeeAmount.toString(),
              blockchain,
              tokenId,
            );
          } catch (feeErr) {
            this.logger.warn(
              `Platform fee transfer failed for tip ${tip.id}: ${(feeErr as Error).message}`,
            );
          }
        }
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

      if (fanId) {
      this.circleService.getWalletBalanceForUser(fanId).catch((err) => {
        this.logger.warn(
          `Balance cache refresh failed for fan ${fanId}: ${(err as Error).message}`,
        );
      });
    }
    this.circleService.getWalletBalanceForUser(creatorId).catch((err) => {
      this.logger.warn(
        `Balance cache refresh failed for creator ${creatorId}: ${(err as Error).message}`,
      );
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
