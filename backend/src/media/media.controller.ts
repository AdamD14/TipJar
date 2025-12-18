import {
  Controller,
  Post,
  Body,
  UseGuards,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ValidatedUser } from '../auth/auth.service';
import { MediaService } from './media.service';
import { User } from '../auth/user.decorator';

@Controller('media')
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
      bucket?: string;
      etag?: string;
    },
  ) {
    const mediaRecord = await this.mediaService.createMediaRecord(user.id, {
      slotId: body.slotId,
      storjKey: body.storjKey,
      fileName: body.fileName,
      fileSize: body.fileSize,
      contentType: body.contentType,
      bucket: body.bucket,
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

import { Request } from 'express';

@Controller('media/internal')
export class InternalMediaController {
  constructor(private readonly mediaService: MediaService) {}

  private validateApiKey(req: Request) {
    const apiKey = req.headers['x-internal-api-key'];
    if (!apiKey || apiKey !== process.env.NESTJS_SECRET_KEY) {
      throw new UnauthorizedException('Invalid Internal API Key');
    }
  }

  @Post('reserve-slot')
  async reserveSlot(
    @Req() req: Request,
    @Body()
    body: {
      userId: string;
      slotId: number;
      s3Key: string;
      fileName: string;
      contentType: string;
      fileSize: number;
    },
  ) {
    this.validateApiKey(req);
    return this.mediaService.reserveSlot(body.userId, body);
  }

  @Post('confirm-upload')
  async confirmUpload(
    @Req() req: Request,
    @Body() body: { s3Key: string; etag?: string },
  ) {
    this.validateApiKey(req);
    return this.mediaService.confirmUpload(body.s3Key, body.etag);
  }
}
