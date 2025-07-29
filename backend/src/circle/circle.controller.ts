import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CircleService } from './circle.service';
import { Request } from 'express';
import { ValidatedUser } from '../auth/auth.service';
import { CreateHostedDepositDto } from './dto/create-hosted-deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { CctpTransferDto } from './dto/cctp-transfer.dto';
import { UserRole } from '@prisma/client';

@Controller('circle')
export class CircleController {
  constructor(private readonly circleService: CircleService) {}

  @Post('wallet/create')
  @UseGuards(AuthGuard('jwt'))
  async createWallet(@Req() req: Request) {
    const user = req.user as ValidatedUser;
    return this.circleService.provisionUserWallet(
      user.id,
      user.email,
      user.role,
    );
  }

  @Get('wallet')
  @UseGuards(AuthGuard('jwt'))
  async getWallet(@Req() req: Request) {
    const user = req.user as ValidatedUser;
    return this.circleService.getUserWalletInfo(user.id);
  }

  @Get('wallet/balance')
  @UseGuards(AuthGuard('jwt'))
  async getBalance(@Req() req: Request) {
    const user = req.user as ValidatedUser;
    return this.circleService.getUserWalletBalance(user.id);
  }

  @Get('wallet/transactions')
  @UseGuards(AuthGuard('jwt'))
  async getTransactions(@Req() req: Request) {
    const user = req.user as ValidatedUser;
    return this.circleService.getWalletTransactionsForUser(user.id);
  }

  @Post('deposit-hosted')
  @UseGuards(AuthGuard('jwt'))
  async depositHosted(
    @Req() req: Request,
    @Body() dto: CreateHostedDepositDto,
  ) {
    const user = req.user as ValidatedUser;
    return this.circleService.createHostedDeposit(user.id, dto.amount);
  }

  @Post('withdraw')
  @UseGuards(AuthGuard('jwt'))
  async withdraw(@Req() req: Request, @Body() dto: WithdrawDto) {
    const user = req.user as ValidatedUser;
    if (user.role !== UserRole.CREATOR && user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException();
    }
    return this.circleService.withdrawForUser(
      user.id,
      dto.amount,
      dto.toAddress,
    );
  }

  @Post('cctp/transfer')
  @UseGuards(AuthGuard('jwt'))
  async cctpTransfer(@Req() req: Request, @Body() dto: CctpTransferDto) {
    const user = req.user as ValidatedUser;
    return this.circleService.initiateCctpTransfer(
      user.id,
      dto.amount,
      dto.toChain,
      dto.toAddress,
    );
  }

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async webhook(@Body() body: any) {
    await this.circleService.handleWebhook(body);
    return { status: 'ok' };
  }

  @Get('admin/wallets')
  @UseGuards(AuthGuard('jwt'))
  async listWallets(@Req() req: Request) {
    const user = req.user as ValidatedUser;
    if (user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException();
    }
    return this.circleService.listAllWallets();
  }
}
