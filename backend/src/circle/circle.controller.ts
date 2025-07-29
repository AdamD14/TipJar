import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  Request,
  Headers,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CircleService } from './circle.service';

@Controller('circle')
export class CircleController {
  constructor(
    private readonly circleService: CircleService,
    private readonly configService: ConfigService,
  ) {}

  @Post('wallet/create')
  @UseGuards(JwtAuthGuard)
  async createWallet(@Req() req: Request) {
    const user = (req as any).user;
    return this.circleService.provisionUserWallet(
      user.id,
      user.email,
      user.role,
    );
  }

  @Get('wallet')
  @UseGuards(JwtAuthGuard)
  async getWallet(@Req() req: Request) {
    const user = (req as any).user;
    return this.circleService.getUserWallet(user.id);
  }

  @Get('wallet/balance')
  @UseGuards(JwtAuthGuard)
  async getBalance(@Req() req: Request) {
    const user = (req as any).user;
    const wallet = await this.circleService.getUserWallet(user.id);
    const balance = await this.circleService.getWalletBalance(wallet.walletId);
    return { balance, currency: 'USDC' };
  }

  @Get('wallet/transactions')
  @UseGuards(JwtAuthGuard)
  async getTransactions(@Req() req: Request) {
    const user = (req as any).user;
    return this.circleService.listUserTransactions(user.id);
  }

  @Post('withdraw')
  @UseGuards(JwtAuthGuard)
  async withdraw(
    @Req() req: Request,
    @Body() body: { amount: string; toAddress: string },
  ) {
    const user = (req as any).user;
    const blockchain = this.configService.get<string>(
      'DEFAULT_BLOCKCHAIN',
      'MATIC-AMOY',
    );
    const tokenId = this.configService.get<string>('USDC_TOKEN_ID', 'USDC');
    return this.circleService.initiateWithdrawal(
      user.id,
      body.toAddress,
      body.amount,
      blockchain as any,
      tokenId,
    );
  }

  @Post('deposit-hosted')
  @UseGuards(JwtAuthGuard)
  async depositHosted(@Req() req: Request, @Body() body: { amount: number }) {
    const user = (req as any).user;
    return this.circleService.createHostedCheckout(user.id, body.amount);
  }

  @Post('webhook')
  async webhook(
    @Body() body: any,
    @Headers('circle-signature') signature: string,
  ) {
    return this.circleService.handleWebhook(body, signature);
  }

  @Get('admin/wallets')
  @UseGuards(JwtAuthGuard)
  async listWallets() {
    return this.circleService.listAllWallets();
  }
}
