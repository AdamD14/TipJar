import { Module, Global } from '@nestjs/common';
import { CircleService } from './circle.service';
import { CircleController } from './circle.controller';
import { ConfigModule } from '@nestjs/config';
import { CircleController } from './circle.controller';

@Global()
@Module({
  imports: [ConfigModule],
  controllers: [CircleController],
  providers: [CircleService],
  exports: [CircleService],
})
export class CircleModule {}
