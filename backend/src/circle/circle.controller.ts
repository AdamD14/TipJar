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
import { ValidatedUser } from '../auth/auth.service';
import { UserRole } from '@prisma/client';
import { TransactionState } from '@circle-fin/developer-controlled-wallets';

import { CctpTransferDto } from './dto/cctp-transfer.dto';
import { CreateHostedDepositDto } from './dto/create-hosted-deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';

type WalletInfo = { walletId: string; address: string; chain: string };
type WalletCreated = { walletId: string; address: string };
type HostedDeposit = { hostedUrl: string };
type WithdrawalResult = {
  circleTransactionId: string;
  status: TransactionState;
  txHash?: string;
};
type CctpResult = { transferId: string };
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
  constructor(private readonly circleService: CircleService) {}

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
    const tokenId = this.circleService.getUsdcTokenId();
    return this.circleService.initiateWithdrawal(
      user.id,
      body.toAddress,
      body.amount,
      blockchain,
      tokenId,
    );
  }

  @Post('cctp/transfer')
  @UseGuards(AuthGuard('jwt'))
  async cctpTransfer(
    @Req() req: Request,
    @Body() body: CctpTransferDto,
  ): Promise<CctpResult> {
    const user = req.user as ValidatedUser;
    const amountNum = parseFloat(body.amount);
    return this.circleService.initiateCctpTransfer(
      user.id,
      amountNum,
      body.toChain,
      body.toAddress,
    );
  }

  @Post('webhook')
  async webhook(@Body() payload: unknown): Promise<WebhookAck> {
    await this.circleService.handleWebhook(payload);
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
