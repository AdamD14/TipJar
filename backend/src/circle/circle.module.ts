import { Module, Global } from '@nestjs/common';
import { CircleService } from './circle.service';
import { ConfigModule } from '@nestjs/config';
import { CircleController, AdminCircleController } from './circle.controller';

@Global()
@Module({
  imports: [ConfigModule],
  controllers: [CircleController, AdminCircleController],
  providers: [CircleService],
  exports: [CircleService],
})
export class CircleModule {}
