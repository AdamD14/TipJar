import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
  Logger,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PublicTipRow, TipsService } from './tips.service';
import { CreateTipDto, CreateGuestTipDto } from './dto/create-tip.dto';
import { Request } from 'express';
import { ValidatedUser } from '../auth/auth.service';
import { Tip } from '@prisma/client';

@Controller('tips')
export class TipsController {
  private readonly logger = new Logger(TipsController.name);

  constructor(private readonly tipsService: TipsService) {}

  @Get('public/:creatorId')
  async getPublicTips(
    @Param('creatorId') creatorId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<{ tips: Array<PublicTipRow>; total: number }> {
    const p = Math.max(1, parseInt(page ?? '1', 10) || 1);
    const l = Math.min(50, Math.max(1, parseInt(limit ?? '20', 10) || 20));
    return this.tipsService.getPublicTipsForCreator(creatorId, p, l);
  }

  @Get('goal/:creatorId')
  async getGoalProgress(
    @Param('creatorId') creatorId: string,
  ): Promise<{ totalReceived: string; tipCount: number }> {
    return this.tipsService.getGoalProgressForCreator(creatorId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  async createTip(
    @Body() createTipDto: CreateTipDto,
    @Req() req: Request,
  ): Promise<Tip> {
    const fan = req.user as ValidatedUser;
    this.logger.log(
      `User [${fan.id}] creating tip for creator [${createTipDto.creatorId}]`,
    );
    return this.tipsService.processNewTip({
      ...createTipDto,
      fanId: fan.id,
    });
  }

  @Post('guest')
  @HttpCode(HttpStatus.CREATED)
  async createGuestTip(
    @Body() createGuestTipDto: CreateGuestTipDto,
  ): Promise<Tip> {
    this.logger.log(
      `Guest creating tip for creator [${createGuestTipDto.creatorId}]`,
    );
    return this.tipsService.processNewTip({
      ...createGuestTipDto,
      fanId: null,
    });
  }
}
