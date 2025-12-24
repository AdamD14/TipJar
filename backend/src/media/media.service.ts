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

  // KROK 1: Rezerwacja slotu
  async reserveAvatarSlot(dto: ReserveSlotDto) {
    return await this.prisma.mediaRecord.upsert({
      where: { userId_slotId: { userId: dto.userId, slotId: dto.slotId } },
      update: {
        storjKey: dto.s3Key,
        publicUrl: dto.publicUrl,
        status: "PENDING",
        bucket: "storj-tipjar",
        provider: "storj",
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
        bucket: "storj-tipjar",
        provider: "storj",
      },
    });
  }

  // KROK 2: Potwierdzenie (Called provided by Edge Function)
  async confirmUpload(dto: ConfirmUploadDto) {
    // 1. Znajdź po s3Key (jeśli podany) lub userId+slotId
    let avatar;
    if (dto.s3Key) {
      avatar = await this.prisma.mediaRecord.findFirst({
        where: { storjKey: dto.s3Key },
      });
    } else if (dto.userId && dto.slotId !== undefined) {
      avatar = await this.prisma.mediaRecord.findUnique({
        where: { userId_slotId: { userId: dto.userId, slotId: dto.slotId } },
      });
    }

    if (!avatar) throw new NotFoundException("Reservation not found");

    // 2. Generuj Sync URL Cloudinary
    // Storj Public URL is available in avatar.publicUrl (set during reserve)
    // or we can reconstruct it. Reserve sets it correctly.
    const storjUrl = avatar.publicUrl;
    if (!storjUrl) throw new InternalServerErrorException("Missing Storj URL");

    const cloudinaryUrl = this.cloudinary.generateAvatarUrl(storjUrl);

    // 3. Aktualizuj rekord
    // Ustawiamy od razu PROCESSED, bo URL typu 'fetch' działa natychmiastowo
    // (przetwarzanie przy pierwszym żądaniu)
    return await this.prisma.mediaRecord.update({
      where: { id: avatar.id },
      data: {
        publicUrl: cloudinaryUrl,
        status: "PROCESSED",
        etag: dto.etag,
      },
    });
  }
}
