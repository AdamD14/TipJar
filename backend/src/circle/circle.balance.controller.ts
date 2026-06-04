import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { CircleService } from './circle.service';
import { Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { ValidatedUser } from '../auth/auth.service';

@Controller('circle/balance')
@UseGuards(AuthGuard('jwt'))
export class CircleBalanceController {
  constructor(
    private readonly circleService: CircleService,
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientType,
  ) {}

  @Get('stream')
  async balanceStream(@Req() req: Request, @Res() res: Response) {
    const user = req.user as ValidatedUser;
    const userId = user.id;

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');

    try {
      const balance = await this.circleService.getWalletBalanceForUser(userId);
      res.write(`data: ${JSON.stringify(balance)}\n\n`);
    } catch (error) {
      res.write(`data: ${JSON.stringify({ balance: 0, currency: 'USDC' })}\n\n`);
    }

    const channel = `balance:${userId}`;
    const listener = (message: string) => {
      res.write(`data: ${message}\n\n`);
    };

    await this.redis.subscribe(channel, listener);

    req.socket.on('close', async () => {
      await this.redis.unsubscribe(channel, listener);
      res.end();
    });
  }
}