import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ConfirmUploadDto, ReserveSlotDto } from './dto/media.dto';
import { MediaRecord } from '@prisma/client';

@Injectable()
export class MediaService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  // KROK 1: Rezerwacja slotu - zapisuje originalUrl (Storj)
  async reserveAvatarSlot(dto: ReserveSlotDto) {
    return await this.prisma.mediaRecord.upsert({
      where: { userId_slotId: { userId: dto.userId, slotId: dto.slotId } },
      update: {
        storjKey: dto.s3Key,
        originalUrl: dto.originalUrl, // Storj URL
        avatarUrl: null, // Reset przy ponownym uploadzie
        status: 'PENDING',
        bucket: 'tipjar-avatar',
        provider: 'storj',
      },
      create: {
        userId: dto.userId,
        slotId: dto.slotId,
        storjKey: dto.s3Key,
        fileName: dto.fileName || 'avatar.jpg',
        contentType: dto.contentType || 'image/jpeg',
        size: dto.size || 0,
        originalUrl: dto.originalUrl, // Storj URL
        avatarUrl: null,
        status: 'PENDING',
        bucket: 'tipjar-avatar',
        provider: 'storj',
      },
    });
  }

  // KROK 2: Potwierdzenie - generuje Cloudinary Fetch URL
  async confirmUpload(dto: ConfirmUploadDto) {
    // 1. Znajdź po s3Key (jeśli podany) lub userId+slotId
    let avatar: MediaRecord | null = null;
    if (dto.s3Key) {
      avatar = await this.prisma.mediaRecord.findFirst({
        where: { storjKey: dto.s3Key },
      });
    } else if (dto.userId && dto.slotId !== undefined) {
      avatar = await this.prisma.mediaRecord.findUnique({
        where: { userId_slotId: { userId: dto.userId, slotId: dto.slotId } },
      });
    }

    if (!avatar) throw new NotFoundException('Reservation not found');

    // 2. Generuj Cloudinary Fetch URL (bez uploadu!)
    const storjUrl = avatar.originalUrl;
    if (!storjUrl) throw new InternalServerErrorException('Missing Storj URL');

    console.log(
      '[MediaService] Generating Cloudinary fetch URL for:',
      storjUrl,
    );
    const avatarUrl = this.cloudinary.generateOptimizedUrl(storjUrl);
    console.log('[MediaService] Generated Cloudinary URL:', avatarUrl);

    // 3. Aktualizuj rekord
    return await this.prisma.mediaRecord.update({
      where: { id: avatar.id },
      data: {
        avatarUrl: avatarUrl,
        status: 'PROCESSED',
        etag: dto.etag,
      },
    });
  }
}
