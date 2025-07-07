import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OverlaySettings, Prisma } from '@prisma/client';

@Injectable()
export class OverlaySettingsService {
  constructor(private prisma: PrismaService) {}

  get(creatorId: string): Promise<OverlaySettings | null> {
    return this.prisma.overlaySettings.findUnique({ where: { creatorId } });
  }

  save(creatorId: string, data: Prisma.OverlaySettingsUncheckedUpdateInput): Promise<OverlaySettings> {
    return this.prisma.overlaySettings.upsert({
      where: { creatorId },
      update: data,
      create: { creatorId, ...(data as Prisma.OverlaySettingsUncheckedCreateInput) },
    });
  }
}
