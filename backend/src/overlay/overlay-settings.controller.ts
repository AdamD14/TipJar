import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OverlaySettingsService } from './overlay-settings.service';
import { SaveOverlaySettingsDto } from './dto/save-overlay-settings.dto';

@Controller('overlay')
export class OverlaySettingsController {
  constructor(private readonly service: OverlaySettingsService) {}

  @Get('settings/:creatorId')
  get(@Param('creatorId') creatorId: string) {
    return this.service.get(creatorId);
  }

  @Post('settings/:creatorId')
  @UseGuards(AuthGuard('jwt'))
  save(
    @Param('creatorId') creatorId: string,
    @Body() dto: SaveOverlaySettingsDto,
  ) {
    return this.service.save(creatorId, dto);
  }
}
