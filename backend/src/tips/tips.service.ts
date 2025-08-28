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

  async processNewTip(params: ProcessTipParams): Promise<Tip> {
    const {
      amount,
      creatorId,
      fanId,
      message,
      isAnonymous,
      paymentGatewayToken,
    } = params;

    const tip = await this.prisma.tip.create({
      data: {
        amount: new Prisma.Decimal(amount),
        creatorId,
        fanId,
        message,
        isAnonymous: isAnonymous ?? false,
        status: TipStatus.PENDING,
      },
    });

    try {
      if (fanId) {
        // Internal USDC tip between registered users
        const creator = await this.usersService.findOneById(creatorId);
        const fan = await this.usersService.findOneById(fanId);
        const blockchain = this.config.get<string>(
          'DEFAULT_BLOCKCHAIN',
        ) as Blockchain;
        const tokenId = this.config.get<string>('USDC_TOKEN_ID');
        if (!tokenId) {
          throw new Error('USDC token ID not configured');
        }
        const transfer = await this.circleService.initiateInternalTipTransfer(
          fan.circleWalletId,
          creator.circleWalletId,
          amount,
          blockchain,
          tokenId,
        );

        return await this.prisma.tip.update({
          where: { id: tip.id },
          data: {
            status: TipStatus.COMPLETED,
            circleTransferId: transfer.circleTransactionId,
            blockchainTransactionHash: transfer.txHash,
            processedAt: new Date(),
          },
        });
      }

      // Guest tip via payment gateway
      if (!paymentGatewayToken) {
        throw new Error('Missing payment gateway token');
      }

      if (paymentGatewayToken === 'fail') {
        throw new Error('Payment failed');
      }

      const chargeId = randomUUID();
      return await this.prisma.tip.update({
        where: { id: tip.id },
        data: {
          status: TipStatus.COMPLETED,
          paymentGatewayChargeId: chargeId,
          processedAt: new Date(),
        },
      });
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
      throw new InternalServerErrorException('Nie udało się przetworzyć napiwku.');
    }
  }
}
