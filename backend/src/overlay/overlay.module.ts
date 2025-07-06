import { Module } from '@nestjs/common';
import { OverlaySettingsService } from './overlay-settings.service';
import { OverlaySettingsController } from './overlay-settings.controller';

@Module({
  controllers: [OverlaySettingsController],
  providers: [OverlaySettingsService],
  exports: [OverlaySettingsService],
})
export class OverlayModule {}
