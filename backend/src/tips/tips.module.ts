import { Module } from '@nestjs/common';
import { TipsService } from './tips.service';

@Module({
  providers: [TipsService],
  exports: [TipsService],
})
export class TipsModule {}
