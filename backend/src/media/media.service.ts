import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class MediaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async createMediaRecord(
    userId: string,
    data: {
      slotId: number;
      storjKey: string;
      fileName: string;
      fileSize: number;
      contentType: string;
      etag: string;
    },
  ) {
    return this.prisma.mediaRecord.create({
      data: {
        userId,
        storjKey: data.storjKey,
        fileName: data.fileName,
        size: data.fileSize,
        contentType: data.contentType,
        etag: data.etag,
        publicUrl: '', 
        // @ts-ignore: Status enum might not be generated yet or using string literal in prisma schema
        // If status is not in schema, remove it. Schema had no status field in user provided snippet?
        // Wait, user provided schema:
        // model MediaRecord { ... bucket, provider, publicUrl ... }
        // No 'status' field in the user provided snippet!
        // So I should NOT try to set status.
      },
    });
  }

  async updateMediaRecord(
    mediaId: string,
    data: {
      publicUrl?: string;
    }
  ) {
    return this.prisma.mediaRecord.update({
      where: { id: mediaId },
      data,
    });
  }

  async registerWithCloudinary(mediaId: string) {
    const record = await this.prisma.mediaRecord.findUnique({
      where: { id: mediaId },
    });

    if (!record) {
      throw new NotFoundException('Media record not found');
    }

    if (!record.storjKey) {
       throw new BadRequestException('Missing Storj key');
    }

    // URL to access Storj file (via gateway or presigned). 
    // Assuming public bucket or gateway for now based on previous discussions.
    const s3Url = `https://gateway.storjshare.io/${record.bucket}/${record.storjKey}`;

    try {
        const result = await this.cloudinary.uploadFromS3(s3Url, record.id);
        
        return this.prisma.mediaRecord.update({
            where: { id: mediaId },
            data: {
                publicUrl: result.secure_url,
            }
        });
    } catch (error) {
        console.error("Cloudinary sync error:", error);
         throw new BadRequestException("Failed to sync with Cloudinary");
    }
  }

  generateOptimizedUrls(publicId: string) {
    const baseTransforms = {
      thumbnail: { width: 100, height: 100, crop: 'fill', gravity: 'face' },
      avatar: { width: 300, height: 300, crop: 'fill', gravity: 'face' },
      medium: { width: 800, height: 800, crop: 'limit', quality: 'auto:good' },
      large: { width: 1200, height: 1200, crop: 'limit', quality: 'auto:best' },
    };

    const urls: Record<string, string> = {};
    for (const [size, transform] of Object.entries(baseTransforms)) {
      urls[size] = this.cloudinary.url(publicId, {
        ...transform,
        secure: true,
      });
    }

    // Add next-gen formats
    urls['webp'] = this.cloudinary.url(publicId, {
      width: 800,
      height: 800,
      crop: 'limit',
      quality: 'auto:good',
      fetch_format: 'webp',
    });

    return urls;
  }
}
