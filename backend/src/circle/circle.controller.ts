import { Controller, Post, Get, Body, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CircleService } from './circle.service';
import { Request } from 'express';
import { ValidatedUser } from '../auth/auth.service';
import { UserRole } from '@prisma/client';

@Controller('api/v1/circle')
export class CircleController {
  constructor(private readonly circleService: CircleService) {}

  @Post('wallet/create')
  @UseGuards(AuthGuard('jwt'))
  async createWallet(@Req() req: Request) {
    const user = req.user as ValidatedUser;
    const { circleWalletId, mainWalletAddress } = await this.circleService.provisionUserWallet(
      user.id,
      user.email,
      user.role,
    );
    return { walletId: circleWalletId, address: mainWalletAddress };
  }

  @Get('wallet')
  @UseGuards(AuthGuard('jwt'))
  async getWallet(@Req() req: Request) {
    const user = req.user as ValidatedUser;
    return this.circleService.getWalletForUser(user.id);
  }

  @Get('wallet/balance')
  @UseGuards(AuthGuard('jwt'))
  async getBalance(@Req() req: Request) {
    const user = req.user as ValidatedUser;
    return this.circleService.getWalletBalanceForUser(user.id);
  }

  @Get('wallet/transactions')
  @UseGuards(AuthGuard('jwt'))
  async getTransactions(@Req() req: Request) {
    const user = req.user as ValidatedUser;
    return this.circleService.getWalletTransactions(user.id);
  }

  @Post('deposit-hosted')
  @UseGuards(AuthGuard('jwt'))
  async createHostedDeposit(@Req() req: Request, @Body() body: { amount: number }) {
    const user = req.user as ValidatedUser;
    return this.circleService.createHostedDeposit(user.id, body.amount);
  }

  @Post('withdraw')
  @UseGuards(AuthGuard('jwt'))
  async withdraw(@Req() req: Request, @Body() body: { amount: string; toAddress: string }) {
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
    @Body() body: { amount: number; toChain: string; toAddress: string },
  ) {
    const user = req.user as ValidatedUser;
    return this.circleService.initiateCctpTransfer(user.id, body.amount, body.toChain, body.toAddress);
  }

  @Post('webhook')
  async webhook(@Body() body: any) {
    // For now just acknowledge; signature verification would be done inside the service
    await this.circleService.handleWebhook(body);
    return { received: true };
  }

  @Get('admin/circle/wallets')
  @UseGuards(AuthGuard('jwt'))
  async listAll(@Req() req: Request) {
    const user = req.user as ValidatedUser;
    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException();
    }
    return this.circleService.listAllWallets();
  }
}
