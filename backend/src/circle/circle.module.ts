import { Module, Global } from '@nestjs/common';
import { CircleService } from './circle.service';
import { ConfigModule } from '@nestjs/config';
import { CircleController } from './circle.controller';
import { CircleConnectController } from './circle.connect.controller';
import { CircleBalanceController } from './circle.balance.controller';
import { NotificationsController } from './circle.notifications.controller';
import { WebhookEventsService } from '../webhooks/webhook-events.service';

@Global()
@Module({
  imports: [ConfigModule],
  controllers: [
    CircleController,
    CircleConnectController,
    CircleBalanceController,
    NotificationsController,
  ],
  providers: [CircleService, WebhookEventsService],
  exports: [CircleService],
})
export class CircleModule {}
