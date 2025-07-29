import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CircleService } from './circle.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/guards/roles.decorator';
import { UserRole } from '@prisma/client';
import { Request } from 'express';
import { ValidatedUser } from '../auth/auth.service';

@Controller('circle')
export class CircleController {
  constructor(private readonly circleService: CircleService) {}

  @Post('wallet/create')
  @UseGuards(JwtAuthGuard)
  createWallet(@Req() req: Request) {
    const user = req.user as ValidatedUser;
    return this.circleService.provisionUserWallet(user.id, user.email, user.role);
  }

  @Get('wallet')
  @UseGuards(JwtAuthGuard)
  getWallet(@Req() req: Request) {
    const user = req.user as ValidatedUser;
    return this.circleService.getWalletForUser(user.id);
  }

  @Get('wallet/balance')
  @UseGuards(JwtAuthGuard)
  getWalletBalance(@Req() req: Request) {
    const user = req.user as ValidatedUser;
    return this.circleService.getWalletBalanceForUser(user.id);
  }

  @Get('wallet/transactions')
  @UseGuards(JwtAuthGuard)
  getTransactions(@Req() req: Request) {
    const user = req.user as ValidatedUser;
    return this.circleService.getWalletTransactions(user.id);
  }

  @Post('deposit-hosted')
  @UseGuards(JwtAuthGuard)
  createHostedDeposit(@Req() req: Request, @Body() body: { amount: number }) {
    const user = req.user as ValidatedUser;
    return this.circleService.createHostedDeposit(user.id, body.amount);
  }

  @Post('cctp/transfer')
  @UseGuards(JwtAuthGuard)
  cctpTransfer(
    @Req() req: Request,
    @Body() body: { amount: number; toChain: string; toAddress: string },
  ) {
    const user = req.user as ValidatedUser;
    return this.circleService.initiateCctpTransfer(
      user.id,
      body.amount,
      body.toChain,
      body.toAddress,
    );
  }
}

@Controller('admin/circle')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminCircleController {
  constructor(private readonly circleService: CircleService) {}

  @Get('wallets')
  @Roles(UserRole.ADMIN)
  listAllWallets() {
    return this.circleService.listAllWallets();
  }
}
