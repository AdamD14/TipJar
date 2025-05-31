import { Module } from '@nestjs/common';
import { CircleService } from './circle.service';

@Module({
  providers: [CircleService],
  exports: [CircleService], // ważne, żeby AuthModule mógł go wstrzykiwać
})
export class CircleModule {}
