import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { ValidatedUser } from '../auth/auth.service';

@Controller('notifications')
@UseGuards(AuthGuard('jwt'))
export class NotificationsController {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: RedisClientType) {}

  @Get('stream')
  async notificationsStream(@Req() req: Request, @Res() res: Response) {
    const user = req.user as ValidatedUser;
    const userId = user.id;

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection' , 'keep-alive');

    const channel = `notifications:${userId}`;
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
