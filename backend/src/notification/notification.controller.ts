import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { NotificationService } from './notification.service';
import { ValidatedUser } from '../auth/auth.service';

type RequestWithUser = ExpressRequest & { user: ValidatedUser };

type NotificationRow = {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: Date;
};

class CreateNotificationDto {
  title!: string;
  message!: string;
  type!: string;
}

@ApiTags('Notifications')
@ApiBearerAuth()
@Controller('notifications') // globalny prefix 'api/v1' już jest w main.ts
export class NotificationController {
  constructor(private readonly notifications: NotificationService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Pobierz powiadomienia zalogowanego użytkownika' })
  @ApiOkResponse({ description: 'Lista powiadomień' })
  async list(@Req() req: RequestWithUser): Promise<NotificationRow[]> {
    const rows = await this.notifications.getUserNotifications(req.user.id);
    return rows;
  }

  @Post('read-all')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Oznacz wszystkie powiadomienia jako przeczytane' })
  @ApiOkResponse({ description: 'Liczba zaktualizowanych rekordów' })
  async markAll(
    @Req() req: RequestWithUser,
  ): Promise<{ updatedCount: number }> {
    const updatedCount = await this.notifications.markAllAsRead(req.user.id);
    return { updatedCount };
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Utwórz powiadomienie (dev/test)' })
  @ApiOkResponse({ description: 'Utworzone powiadomienie' })
  async create(
    @Req() req: RequestWithUser,
    @Body() body: CreateNotificationDto,
  ): Promise<NotificationRow> {
    const row = await this.notifications.create({
      userId: req.user.id,
      title: body.title,
      message: body.message,
      type: body.type,
    });
    return row;
  }
}
