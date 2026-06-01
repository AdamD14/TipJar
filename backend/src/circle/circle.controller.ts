// backend/src/circle/circle.controller.ts
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { CircleService } from './circle.service';
import { WebhookEventsService } from '../webhooks/webhook-events.service';
import { ValidatedUser } from '../auth/auth.service';
import { UserRole } from '@prisma/client';
import { TransactionState } from '@circle-fin/developer-controlled-wallets';

import { CreateHostedDepositDto } from './dto/create-hosted-deposit.dto';
import { GatewayDepositDto } from './dto/gateway-deposit.dto';
import { GatewayTransferDto } from './dto/gateway-transfer.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { AddDelegateDto, RemoveDelegateDto } from './dto/gateway-delegate.dto';

type WalletInfo = { walletId: string; address: string; chain: string };
type WalletCreated = { walletId: string; address: string };
type HostedDeposit = { hostedUrl: string };
type WithdrawalResult = {
  circleTransactionId: string;
  status: TransactionState;
  txHash?: string;
};

type GatewayDepositResult = { approveTxId: string; depositTxId: string };
type GatewayTransferResult = { burnSignTxId: string; mintTxId: string };
type DelegateResult = { txId: string };
type WebhookAck = { received: true };
type AdminWalletRow = {
  id: string;
  email: string | null;
  circleWalletId: string | null;
  mainWalletAddress: string | null;
};
type BalanceResponse = { balance: number; currency: string };
type TxRow = {
  id: string;
  type: string;
  status: string;
  amount?: string;
  currency?: string;
  source?: string | null;
  destination?: string | null;
  chain?: string;
  createdAt?: string;
};

@Controller('circle')
export class CircleController {
  constructor(
    private readonly circleService: CircleService,
    private readonly webhookEvents: WebhookEventsService,
  ) {}

  @Post('wallet/create')
  @UseGuards(AuthGuard('jwt'))
  async createWallet(@Req() req: Request): Promise<WalletCreated> {
    const user = req.user as ValidatedUser;
    const { circleWalletId, mainWalletAddress } =
      await this.circleService.provisionUserWallet(
        user.id,
        user.email,
        user.role,
      );
    return { walletId: circleWalletId, address: mainWalletAddress };
  }

  @Get('wallet')
  @UseGuards(AuthGuard('jwt'))
  async getWallet(@Req() req: Request): Promise<WalletInfo> {
    const user = req.user as ValidatedUser;
    return this.circleService.getWalletForUser(user.id);
  }

  @Get('wallet/balance')
  @UseGuards(AuthGuard('jwt'))
  async getBalance(@Req() req: Request): Promise<BalanceResponse> {
    const user = req.user as ValidatedUser;
    return this.circleService.getWalletBalanceForUser(user.id);
  }

  @Get('wallet/transactions')
  @UseGuards(AuthGuard('jwt'))
  async getTransactions(@Req() req: Request): Promise<TxRow[]> {
    const user = req.user as ValidatedUser;
    return this.circleService.getWalletTransactions(user.id);
  }

  @Post('deposit-hosted')
  @UseGuards(AuthGuard('jwt'))
  async createHostedDeposit(
    @Req() req: Request,
    @Body() body: CreateHostedDepositDto,
  ): Promise<HostedDeposit> {
    const user = req.user as ValidatedUser;
    // DTO amount jest stringiem z @IsDecimal – przekazujemy number do serwisu
    const amountNum = parseFloat(body.amount);
    return this.circleService.createHostedDeposit(user.id, amountNum);
  }

  @Post('withdraw')
  @UseGuards(AuthGuard('jwt'))
  async withdraw(
    @Req() req: Request,
    @Body() body: WithdrawDto,
  ): Promise<WithdrawalResult> {
    const user = req.user as ValidatedUser;
    const blockchain = this.circleService.getDefaultBlockchain();
    const tokenId = this.circleService.getTokenIdForChain();
    return this.circleService.initiateWithdrawal(
      user.id,
      body.toAddress,
      body.amount,
      blockchain,
      tokenId,
    );
  }

  @Post('gateway/deposit')
  @UseGuards(AuthGuard('jwt'))
  async gatewayDeposit(
    @Req() req: Request,
    @Body() body: GatewayDepositDto,
  ): Promise<GatewayDepositResult> {
    const user = req.user as ValidatedUser;
    return this.circleService.initiateGatewayDeposit(user.id, body.amount);
  }

  @Post('gateway/transfer')
  @UseGuards(AuthGuard('jwt'))
  async gatewayTransfer(
    @Req() req: Request,
    @Body() body: GatewayTransferDto,
  ): Promise<GatewayTransferResult> {
    const user = req.user as ValidatedUser;
    return this.circleService.initiateGatewayTransfer(
      user.id,
      body.amount,
      body.destinationDomain,
      body.recipientAddress,
    );
  }



  @Post('gateway/add-delegate')
  @UseGuards(AuthGuard('jwt'))
  async addDelegate(
    @Req() req: Request,
    @Body() body: AddDelegateDto,
  ): Promise<DelegateResult> {
    const user = req.user as ValidatedUser;
    const { address } = await this.circleService.getWalletForUser(user.id);
    const txId = await this.circleService.addGatewayDelegate(
      address,
      body.delegateAddress,
    );
    return { txId };
  }

  @Post('gateway/remove-delegate')
  @UseGuards(AuthGuard('jwt'))
  async removeDelegate(
    @Req() req: Request,
    @Body() body: RemoveDelegateDto,
  ): Promise<DelegateResult> {
    const user = req.user as ValidatedUser;
    const { address } = await this.circleService.getWalletForUser(user.id);
    const txId = await this.circleService.removeGatewayDelegate(
      address,
      body.delegateAddress,
    );
    return { txId };
  }

  @Post('webhook')
  async webhook(
    @Body() payload: any,
    @Req() req: Request,
  ): Promise<WebhookAck> {
    const headers: any = (req as any).headers || {};
    const sig =
      headers['circle-signature'] || headers['x-circle-signature'] || null;
    const notificationType = payload?.notificationType || 'unknown';
    const externalId =
      payload?.notificationId || payload?.notification?.id || null;
    const ev = await this.webhookEvents.recordReceived({
      externalId,
      type: notificationType,
      signature: sig,
      rawJson: payload,
    });
    try {
      await this.circleService.handleWebhook(payload);
      await this.webhookEvents.markProcessed(ev.id);
    } catch (e: any) {
      await this.webhookEvents.markError(ev.id, e?.message || 'error');
      throw e;
    }
    return { received: true };
  }

  @Get('admin/circle/wallets')
  @UseGuards(AuthGuard('jwt'))
  async listAll(@Req() req: Request): Promise<AdminWalletRow[]> {
    const user = req.user as ValidatedUser;
    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException();
    }
    return this.circleService.listAllWallets();
  }
}
