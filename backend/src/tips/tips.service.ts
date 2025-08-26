import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma, Tip, TipStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { CircleService } from '../circle/circle.service';
import { ConfigService } from '@nestjs/config';

interface ProcessTipInput {
  amount: string;
  creatorId: string;
  fanId: string | null;
  message?: string;
  isAnonymous?: boolean;
  paymentGatewayToken?: string;
}

@Injectable()
export class TipsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly circleService: CircleService,
    private readonly config: ConfigService,
  ) {}

  async processNewTip(data: ProcessTipInput): Promise<Tip> {
    const { amount, creatorId, fanId, message, isAnonymous, paymentGatewayToken } = data;

    const tip = await this.prisma.tip.create({
      data: {
        amount: new Prisma.Decimal(amount),
        creatorId,
        fanId,
        message,
        isAnonymous,
        status: TipStatus.PENDING,
      },
    });

    if (fanId) {
      const [creator, fan] = await Promise.all([
        this.usersService.findOneById(creatorId),
        this.usersService.findOneById(fanId),
      ]);

      try {
        const blockchain = this.config.get<string>('DEFAULT_BLOCKCHAIN') as any;
        const tokenId = this.config.get<string>('USDC_TOKEN_ID') as string;
        const transfer = await this.circleService.initiateInternalTipTransfer(
          fan?.circleWalletId as string,
          creator?.circleWalletId as string,
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
          },
        });
      } catch (error) {
        await this.prisma.tip.update({
          where: { id: tip.id },
          data: { status: TipStatus.FAILED },
        });
        throw new InternalServerErrorException('Internal transfer failed');
      }
    }

    try {
      if (!paymentGatewayToken) {
        throw new Error('Payment token missing');
      }
      if (paymentGatewayToken === 'fail') {
        throw new Error('Payment failed');
      }
      const chargeId = `pg_${Date.now()}`;
      return await this.prisma.tip.update({
        where: { id: tip.id },
        data: {
          status: TipStatus.COMPLETED,
          paymentGatewayChargeId: chargeId,
        },
      });
    } catch (error) {
      await this.prisma.tip.update({
        where: { id: tip.id },
        data: { status: TipStatus.FAILED },
      });
      throw new InternalServerErrorException('Payment failed');
    }
  }
}
