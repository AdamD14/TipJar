import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { CircleService } from './circle.service';
import { ValidatedUser } from '../auth/auth.service';
import { RedisSubscriberService } from '../shared/redis/redis-subscriber.service';

@Controller('circle/balance')
@UseGuards(AuthGuard('jwt'))
export class CircleBalanceController {
  constructor(
    private readonly circleService: CircleService,
    private readonly redisSubscriber: RedisSubscriberService,
  ) {}

  @Get('stream')
  async balanceStream(@Req() req: Request, @Res() res: Response) {
    const user = req.user as ValidatedUser;
    const userId = user.id;

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders();

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

    await this.redisSubscriber.subscribe(channel, listener);

    req.socket.on('close', async () => {
      await this.redisSubscriber.unsubscribe(channel, listener);
      res.end();
    });
  }
}