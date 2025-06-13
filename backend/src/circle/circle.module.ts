import { Module, Global } from '@nestjs/common';
import { CircleService } from './circle.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [CircleService],
  exports: [CircleService],
})
export class CircleModule {}
