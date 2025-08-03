import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotificationService } from './notification.service';

@UseGuards(JwtAuthGuard)
@Controller('api/v1/notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async getNotifications(@Request() req) {
    const userId: string = req.user?.id;
    return this.notificationService.getUserNotifications(userId);
  }

  @Post('mark-as-read')
  @HttpCode(HttpStatus.NO_CONTENT)
  async markAsRead(@Request() req) {
    const userId: string = req.user?.id;
    await this.notificationService.markAllAsRead(userId);
  }
}
