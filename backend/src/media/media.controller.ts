import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ValidatedUser } from '../auth/auth.service';
import { MediaService } from './media.service';
import { User } from '../auth/user.decorator';

@Controller('api/media')
@UseGuards(JwtAuthGuard)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('register-upload')
  async registerUpload(
    @User() user: ValidatedUser,
    @Body()
    body: {
      slotId: number;
      storjKey: string;
      fileName: string;
      fileSize: number;
      contentType: string;
      etag?: string;
    },
  ) {
    const mediaRecord = await this.mediaService.createMediaRecord(user.id, {
      slotId: body.slotId,
      storjKey: body.storjKey,
      fileName: body.fileName,
      fileSize: body.fileSize,
      contentType: body.contentType,
      etag: body.etag || '',
    });

    const cloudinaryResult = await this.mediaService.registerWithCloudinary(
      mediaRecord.id,
    );

    const optimizedUrls = this.mediaService.generateOptimizedUrls(
      mediaRecord.id,
    );

    return {
      success: true,
      storjKey: body.storjKey,
      cloudinaryUrl: cloudinaryResult.publicUrl,
      cloudinaryPublicId: mediaRecord.id,
      optimizedUrls,
      mediaRecord: cloudinaryResult,
    };
  }
}
