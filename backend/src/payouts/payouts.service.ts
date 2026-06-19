import {
  Injectable,
  Logger,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CircleService } from '../circle/circle.service';
import { NotificationService } from '../notification/notification.service';
import { Payout, PayoutStatus, Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { Blockchain } from '@circle-fin/developer-controlled-wallets';

@Injectable()
export class PayoutsService {
  private readonly logger = new Logger(PayoutsService.name);

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    @Inject(forwardRef(() => CircleService))
    private circleService: CircleService,
    private notificationService: NotificationService,
  ) {}

  async createPayout(
    creatorId: string,
    amount: string,
    destinationAddress: string,
  ): Promise<Payout> {
    const creator = await this.prisma.user.findUnique({
      where: { id: creatorId },
      select: { circleWalletId: true, id: true },
    });
    if (!creator || !creator.circleWalletId) {
      throw new NotFoundException('Creator wallet not configured');
    }

    const feeWalletAddress =
      this.configService.get<string>('FEE_WALLET_ADDRESS');
    if (!feeWalletAddress) {
      throw new Error('FEE_WALLET_ADDRESS not configured');
    }

    const grossDecimal = new Prisma.Decimal(amount);
    const feeAmountDecimal = grossDecimal
      .mul(0.025)
      .toDecimalPlaces(6, Prisma.Decimal.ROUND_DOWN);
    const netAmountDecimal = grossDecimal
      .sub(feeAmountDecimal)
      .toDecimalPlaces(6, Prisma.Decimal.ROUND_DOWN);

    const payout = await this.prisma.payout.create({
      data: {
        creatorId,
        amount: grossDecimal,
        destinationAddress,
        status: PayoutStatus.PENDING,
      },
    });

    let feeTxRecord: { id: string } | undefined;
    let netTransfer: { circleTransactionId: string } | undefined;

    const blockchain = this.configService.get<string>(
      'DEFAULT_BLOCKCHAIN',
      'ARC-TESTNET',
    ) as Blockchain;
    const tokenId = this.circleService.getTokenIdForChain();

    try {
      feeTxRecord = await this.prisma.feeTransaction.create({
        data: {
          walletId: creator.circleWalletId,
          type: 'WITHDRAWAL',
          grossAmount: grossDecimal,
          feeAmount: feeAmountDecimal,
          netAmount: netAmountDecimal,
          status: 'PENDING',
        },
      });

      // ---------- KROK 1: TRANSFER NETTO ----------
      netTransfer = await this.circleService.transferToAddress(
        creator.circleWalletId,
        destinationAddress,
        netAmountDecimal.toFixed(6),
        blockchain,
        tokenId,
      );

      // PUNKT BEZPOWROTU: Środki netto zostały pomyślnie zlecone w Circle SDK.
      await this.prisma.payout.update({
        where: { id: payout.id },
        data: {
          circleTransactionId: netTransfer.circleTransactionId,
          status: PayoutStatus.PROCESSING,
        },
      });
    } catch (err) {
      this.logger.error(
        `Payout ${payout.id} failed to initiate net transfer`,
        err as Error,
      );
      if (feeTxRecord) {
        await this.prisma.feeTransaction.update({
          where: { id: feeTxRecord.id },
          data: { status: 'FAILED' },
        });
      }
      await this.prisma.payout.update({
        where: { id: payout.id },
        data: { status: PayoutStatus.FAILED },
      });
      throw err;
    }

    // ---------- KROK 2: TRANSFER FEE (IZOLOWANY BLOK) ----------
    try {
      const feeTransfer = await this.circleService.transferToAddress(
        creator.circleWalletId,
        feeWalletAddress,
        feeAmountDecimal.toFixed(6),
        blockchain,
        tokenId,
      );

      await this.prisma.feeTransaction.update({
        where: { id: feeTxRecord.id },
        data: {
          feeTxHash: feeTransfer.circleTransactionId,
          status: 'COMPLETED',
        },
      });

      await this.notificationService.create({
        userId: creatorId,
        title: 'Withdrawal Processed',
        message: `You withdrew ${grossDecimal.toFixed(2)} USDC. ${netAmountDecimal.toFixed(2)} USDC was sent to your address, minus ${feeAmountDecimal.toFixed(2)} USDC TipJar+ fee.`,
        type: 'info',
      });
    } catch (feeErr) {
      // Payout zostaje jako PROCESSING, chroniąc nas przed double-spend.
      // Administracja dostaje krytyczny alert o brakującej kasie na portfelu platformy.
      this.logger.error(
        `CRITICAL: Payout ${payout.id} transferred net tokens but FAILED to transfer platform fee. Manual intervention required.`,
        feeErr as Error,
      );

      await this.prisma.feeTransaction.update({
        where: { id: feeTxRecord.id },
        data: { status: 'FAILED' },
      });
    }

    return this.prisma.payout.findUnique({
      where: { id: payout.id },
    }) as Promise<Payout>;
  }
}
