import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
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
      bucket?: string;
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
        bucket: data.bucket || undefined, // Prisma will use default if undefined
        publicUrl: '',
      },
    });
  }

  async updateMediaRecord(
    mediaId: string,
    data: {
      publicUrl?: string;
    },
  ) {
    return this.prisma.mediaRecord.update({
      where: { id: mediaId },
      data,
    });
  }

  async reserveSlot(
    userId: string,
    data: {
      slotId: number;
      s3Key: string;
      fileName: string;
      contentType: string;
      fileSize: number;
    },
  ) {
    // 8-Step Manifesto: Step 2 - Reserve Slot (Pending)
    return this.prisma.mediaRecord.upsert({
      where: {
        userId_slotId: {
          userId,
          slotId: data.slotId,
        },
      },
      update: {
        storjKey: data.s3Key,
        fileName: data.fileName,
        size: data.fileSize,
        contentType: data.contentType,
        status: 'PENDING',
        publicUrl: null,
      },
      create: {
        userId,
        slotId: data.slotId,
        storjKey: data.s3Key,
        fileName: data.fileName,
        size: data.fileSize,
        contentType: data.contentType,
        status: 'PENDING',
        publicUrl: null,
      },
    });
  }

  async confirmUpload(s3Key: string, etag?: string) {
    // 8-Step Manifesto: Step 5, 6, 7
    const record = await this.prisma.mediaRecord.findFirst({
      where: { storjKey: s3Key },
    });

    if (!record) {
      throw new NotFoundException('Media record not found for confirmation');
    }

    await this.prisma.mediaRecord.update({
      where: { id: record.id },
      data: {
        status: 'COMPLETED',
        etag: etag,
      },
    });

    // Cloudinary Sync (Step 6)
    const s3Url = `https://gateway.storjshare.io/${record.bucket}/${record.storjKey}`;

    try {
      const result = await this.cloudinary.uploadFromS3(s3Url, record.id);

      // Step 7: Processed
      return this.prisma.mediaRecord.update({
        where: { id: record.id },
        data: {
          status: 'PROCESSED',
          publicUrl: result.secure_url,
        },
      });
    } catch (error) {
      console.error('Cloudinary sync error:', error);
      await this.prisma.mediaRecord.update({
        where: { id: record.id },
        data: { status: 'FAILED' },
      });
      throw new BadRequestException('Failed to sync with Cloudinary');
    }
  }

  // Legacy method kept for MediaController compatibility if needed
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

    const s3Url = `https://gateway.storjshare.io/${record.bucket}/${record.storjKey}`;

    try {
      const result = await this.cloudinary.uploadFromS3(s3Url, record.id);

      return this.prisma.mediaRecord.update({
        where: { id: mediaId },
        data: {
          publicUrl: result.secure_url,
        },
      });
    } catch (error) {
      console.error('Cloudinary sync error:', error);
      throw new BadRequestException('Failed to sync with Cloudinary');
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
