import { Injectable, Logger, BadRequestException, NotFoundException, InternalServerErrorException, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Tip, TipStatus, UserRole } from '@prisma/client';
import { CircleService } from '../circle/circle.service';
import { UsersService } from '../users/users.service';
import { Decimal } from '@prisma/client/runtime/library';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

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
      if (fanId) {
        this.logger.warn(`TODO: Implement USDC payment logic for fan [${fanId}]`);
        tipRecord = await this.prisma.tip.update({
          where: { id: tipRecord.id },
          data: { status: TipStatus.COMPLETED, processedAt: new Date() },
        });
      } else {
        this.logger.warn('TODO: Implement fiat payment processing for guest.');
        tipRecord = await this.prisma.tip.update({
          where: { id: tipRecord.id },
          data: { status: TipStatus.COMPLETED, paymentGatewayChargeId: `mock_charge_${randomUUID()}`, processedAt: new Date() },
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
      throw new InternalServerErrorException('Przetwarzanie płatności napiwku nie powiodło się.');
    }
  }
}
