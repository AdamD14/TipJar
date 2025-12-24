import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { ConfirmUploadDto, ReserveSlotDto } from "./dto/media.dto";

@Injectable()
export class MediaService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  // KROK 1: Rezerwacja slotu w bazie (wywoływane przez Edge Function storj-presigned)
  // Status: PENDING
  async reserveAvatarSlot(dto: ReserveSlotDto) {
    return await this.prisma.mediaRecord.upsert({
      where: { userId_slotId: { userId: dto.userId, slotId: dto.slotId } },
      update: {
        storjKey: dto.s3Key,
        publicUrl: dto.publicUrl,
        status: "PENDING",
      },
      create: {
        userId: dto.userId,
        slotId: dto.slotId,
        storjKey: dto.s3Key,
        fileName: dto.fileName || "avatar.jpg",
        contentType: dto.contentType || "image/jpeg",
        size: dto.size || 0,
        publicUrl: dto.publicUrl,
        status: "PENDING",
      },
    });
  }

  // KROK 2: Potwierdzenie uploadu i transfer do Cloudinary
  // Status flow: PENDING -> COMPLETED -> PROCESSED
  async confirmUpload(dto: ConfirmUploadDto) {
    const avatar = await this.prisma.mediaRecord.findUnique({
      where: { userId_slotId: { userId: dto.userId, slotId: dto.slotId } },
    });

    if (!avatar) throw new NotFoundException("Reservation not found");

    // Krok 2a: Oznacz jako COMPLETED (plik jest w Storj)
    await this.prisma.mediaRecord.update({
      where: { id: avatar.id },
      data: { status: "COMPLETED" },
    });

    try {
      // Krok 2b: Transfer do Cloudinary przez publiczny URL Storj
      // Cloudinary sam pobierze plik z URL i przetworzy
      const cloudinaryResult = await this.cloudinary.fetchFromStorj(
        avatar.publicUrl!,
        `user-${dto.userId}-slot-${dto.slotId}`,
      );

      // Krok 2c: Oznacz jako PROCESSED z nowym URL
      return await this.prisma.mediaRecord.update({
        where: { id: avatar.id },
        data: {
          publicUrl: cloudinaryResult.secure_url,
          status: "PROCESSED",
        },
      });
    } catch (error) {
      console.error("Cloudinary processing error:", error);
      await this.prisma.mediaRecord.update({
        where: { id: avatar.id },
        data: { status: "FAILED" },
      });
      throw new InternalServerErrorException("Cloudinary processing failed");
    }
  }
}
