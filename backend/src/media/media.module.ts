import { Module } from '@nestjs/common';
import { MediaController, InternalMediaController } from './media.controller';
import { MediaService } from './media.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [MediaController, InternalMediaController],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
