import { Controller, Post, Body, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PayoutsService } from './payouts.service';
import { CreatePayoutDto } from './dto/create-payout.dto';
import { Request } from 'express';
import { ValidatedUser } from '../auth/auth.service';
import { Payout } from '@prisma/client';

@Controller('creator')
export class PayoutsController {
  constructor(private readonly payoutsService: PayoutsService) {}

  @Post('payout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  createPayout(@Req() req: Request, @Body() dto: CreatePayoutDto): Promise<Payout> {
    const user = req.user as ValidatedUser;
    return this.payoutsService.createPayout(user.id, dto.amount, dto.destinationAddress);
  }
}
