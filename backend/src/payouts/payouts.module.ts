import { Module, forwardRef } from '@nestjs/common';
import { PayoutsService } from './payouts.service';
import { PayoutsController } from './payouts.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CircleModule } from '../circle/circle.module';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from '../notification/notification.module'; // <———— NOWY IMPORT

@Module({
  imports: [
    PrismaModule, 
    ConfigModule, 
    forwardRef(() => CircleModule),
    NotificationModule, // <———— KRYTYCZNA DOPISKA: Udostępnia NotificationService dla PayoutsService
  ],
  controllers: [PayoutsController],
  providers: [PayoutsService],
  exports: [PayoutsService],
})
export class PayoutsModule {}