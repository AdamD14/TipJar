import { Controller, Post, Body, Req, UseGuards, Header } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CircleService } from './circle.service';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user?: { id: string };
}

@Controller('circle')
export class CircleController {
  constructor(private readonly circleService: CircleService) {}

  @Post('webhook')
  @Header('Content-Type', 'application/json')
  async handleWebhook(@Req() req: Request, @Body() body: any) {
    return this.circleService.handleWebhook(req, body);
  }

  @Post('withdraw')
  @UseGuards(JwtAuthGuard)
  async withdraw(@Req() req: RequestWithUser, @Body() body: { amount: number; toAddress: string }) {
    const userId = req.user?.id as string;
    return this.circleService.withdrawUSDC(userId, body.amount, body.toAddress);
  }
}
