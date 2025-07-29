import { Controller, Post, Body, Req, UseGuards, Header } from '@nestjs/common';
import { Request } from 'express';
import { CircleService } from './circle.service';
import { AuthGuard } from '@nestjs/passport';
import { ValidatedUser } from '../auth/auth.service';

@Controller('circle')
export class CircleController {
  constructor(private readonly circleService: CircleService) {}

  @Post('webhook')
  @Header('Content-Type', 'application/json')
  async handleWebhook(@Req() req: Request, @Body() body: any) {
    return this.circleService.handleWebhook(req, body);
  }

  @Post('withdraw')
  @UseGuards(AuthGuard('jwt'))
  async withdraw(
    @Req() req: Request,
    @Body() body: { amount: number; toAddress: string },
  ) {
    const user = req.user as ValidatedUser;
    return this.circleService.withdrawUSDC(
      user.id,
      body.amount,
      body.toAddress,
    );
  }
}
