import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Tip, TipStatus, UserRole } from '../../generated/prisma';
import { CircleService } from '../circle/circle.service';
import { UsersService } from '../users/users.service';
import { Decimal } from '@prisma/client/runtime/library';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { Blockchain } from '@circle-fin/developer-controlled-wallets';

interface ProcessTipData {
  amount: string;
  creatorId: string;
  message?: string;
  isAnonymous?: boolean;
  fanId: string | null;
  paymentGatewayToken?: string;
}

@Injectable()
export class TipsService {
  private readonly logger = new Logger(TipsService.name);

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    @Inject(forwardRef(() => CircleService))
    private circleService: CircleService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  private async processFiatPayment(token: string, amount: string): Promise<string> {
    if (!token) {
      throw new BadRequestException('Brak tokenu płatności.');
    }
    // In real implementation this would call an external payment processor.
    if (token.startsWith('fail')) {
      throw new Error('Payment gateway rejected the charge');
    }
    return `mock_charge_${randomUUID()}`;
  }

  async processNewTip(data: ProcessTipData): Promise<Tip> {
    this.logger.log(`Processing new tip: ${JSON.stringify(data)}`);
    const { amount: amountString, creatorId, fanId } = data;

    const creator = await this.usersService.findOneById(creatorId);
    if (!creator || !creator.circleWalletId || creator.role !== UserRole.CREATOR) {
      throw new NotFoundException('Nie znaleziono twórcy lub jego portfel nie jest skonfigurowany.');
    }

    const tipAmountDecimal = new Decimal(amountString);
    if (tipAmountDecimal.isNaN() || tipAmountDecimal.isNegative() || tipAmountDecimal.isZero()) {
      throw new BadRequestException('Nieprawidłowa kwota napiwku.');
    }

    const platformFeePercentage = new Decimal(fanId ? '0.02' : '0.10');
    const platformFeeAmount = tipAmountDecimal.mul(platformFeePercentage).toDecimalPlaces(6);
    const netAmountForCreator = tipAmountDecimal.sub(platformFeeAmount);

    let tipRecord = await this.prisma.tip.create({
      data: {
        amount: tipAmountDecimal,
        creatorId: creator.id,
        fanId,
        status: TipStatus.PENDING,
        platformFeeAmount,
        netAmountForCreator,
        message: data.message,
        isAnonymous: data.isAnonymous || false,
      },
    });

    try {
      const blockchain = this.configService.get<string>(
        'DEFAULT_BLOCKCHAIN',
        'MATIC-AMOY',
      ) as Blockchain;
      const tokenId = this.configService.get<string>('USDC_TOKEN_ID', 'USDC');

      if (fanId) {
        const fan = await this.usersService.findOneById(fanId);
        if (!fan || !fan.circleWalletId) {
          throw new NotFoundException('Portfel fana nie jest skonfigurowany.');
        }

        const transferResult = await this.circleService.initiateInternalTipTransfer(
          fan.circleWalletId,
          creator.circleWalletId,
          netAmountForCreator.toString(),
          blockchain,
          tokenId,
        );

        tipRecord = await this.prisma.tip.update({
          where: { id: tipRecord.id },
          data: {
            status: TipStatus.COMPLETED,
            circleTransferId: transferResult.circleTransactionId,
            blockchainTransactionHash: transferResult.txHash,
            processedAt: new Date(),
          },
        });
      } else {
        const chargeId = await this.processFiatPayment(
          data.paymentGatewayToken as string,
          tipAmountDecimal.toString(),
        );

        tipRecord = await this.prisma.tip.update({
          where: { id: tipRecord.id },
          data: {
            status: TipStatus.COMPLETED,
            paymentGatewayChargeId: chargeId,
            processedAt: new Date(),
          },
        });
      }

      this.logger.log(`Tip [${tipRecord.id}] successfully processed. Status: ${tipRecord.status}`);
      return tipRecord;
    } catch (paymentError) {
      this.logger.error(`Payment processing failed for tip [${tipRecord.id}]:`, paymentError);
      await this.prisma.tip.update({
        where: { id: tipRecord.id },
        data: { status: TipStatus.FAILED },
      });
      if (paymentError instanceof BadRequestException || paymentError instanceof NotFoundException) {
        throw paymentError;
      }
      const message = paymentError instanceof Error ? paymentError.message : 'Przetwarzanie płatności napiwku nie powiodło się.';
      throw new InternalServerErrorException(message);
    }
  }
}
