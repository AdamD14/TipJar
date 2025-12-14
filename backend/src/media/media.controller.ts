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
    // 1. Zapisz metadane w bazie danych (Prisma)
    const mediaRecord = await this.mediaService.createMediaRecord(user.id, {
      slotId: body.slotId,
      storjKey: body.storjKey,
      fileName: body.fileName,
      fileSize: body.fileSize,
      contentType: body.contentType,
      etag: body.etag || '', // Ensure etag is string if required, or handle optional
    });

    // 2. Zarejestruj w Cloudinary (Cloudinary pobierze plik z Storj)
    // Update: Service method expects mediaId, not an object.
    const cloudinaryResult = await this.mediaService.registerWithCloudinary(
      mediaRecord.id,
    );

    // 3. Zaktualizuj rekord z danymi Cloudinary - This is typically handled inside registerWithCloudinary for the basic URL.
    // However, the controller was trying to save specific Cloudinary fields (publicId, version) which aren't in the MediaRecord schema apparently.
    // We will assume registerWithCloudinary handled the persistence of publicUrl.
    // If specific fields are needed, the schema needs updates. For now, we proceed with what we have.

    // 4. Wygeneruj zoptymalizowane URL'e (dla natychmiastowego użycia)
    // Assuming record.id is used as public_id in Cloudinary as per service logic.
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
