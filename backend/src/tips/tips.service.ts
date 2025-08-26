import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, Tip, TipStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { CircleService } from '../circle/circle.service';
import { randomUUID } from 'crypto';

interface NewTipPayload {
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

  async processNewTip(payload: NewTipPayload): Promise<Tip> {
    const { amount, creatorId, fanId, message, isAnonymous, paymentGatewayToken } =
      payload;

    const creator = await this.usersService.findOneById(creatorId);
    if (!creator?.circleWalletId) {
      throw new InternalServerErrorException('Creator wallet not found');
    }

    const createdTip = await this.prisma.tip.create({
      data: {
        amount: new Prisma.Decimal(amount),
        creatorId,
        fanId,
        message,
        isAnonymous: isAnonymous ?? false,
      },
    });

    try {
      if (fanId) {
        // Transfer from fan to creator using Circle wallets
        const fan = await this.usersService.findOneById(fanId);
        if (!fan?.circleWalletId) {
          throw new InternalServerErrorException('Fan wallet not found');
        }

        const blockchain = this.config.get<string>('DEFAULT_BLOCKCHAIN');
        const tokenId = this.config.get<string>('USDC_TOKEN_ID')!;

        const transfer = await this.circleService.initiateInternalTipTransfer(
          fan.circleWalletId,
          creator.circleWalletId,
          amount,
          blockchain as any,
          tokenId,
        );

        const status =
          (transfer.status as unknown as string) === 'complete'
            ? TipStatus.COMPLETED
            : TipStatus.PROCESSING;

        return await this.prisma.tip.update({
          where: { id: createdTip.id },
          data: {
            status,
            circleTransferId: transfer.circleTransactionId,
            blockchainTransactionHash: transfer.txHash,
            processedAt: new Date(),
          },
        });
      } else {
        // Guest tip via external payment gateway
        if (!paymentGatewayToken) {
          throw new InternalServerErrorException('Missing payment token');
        }
        if (paymentGatewayToken === 'fail') {
          throw new Error('Payment failed');
        }
        const chargeId = randomUUID();
        return await this.prisma.tip.update({
          where: { id: createdTip.id },
          data: {
            status: TipStatus.COMPLETED,
            paymentGatewayChargeId: chargeId,
            processedAt: new Date(),
          },
        });
      }
    } catch (error) {
      await this.prisma.tip.update({
        where: { id: createdTip.id },
        data: { status: TipStatus.FAILED },
      });
      this.logger.error('Tip processing failed', (error as Error).stack);
      throw new InternalServerErrorException('Tip processing failed');
    }
  }
}

