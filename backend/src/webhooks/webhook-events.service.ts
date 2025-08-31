import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WebhookEventsService {
  constructor(private readonly prisma: PrismaService) {}

  async recordReceived(input: {
    externalId?: string | null;
    type: string;
    signature?: string | null;
    rawBody?: string | null;
    rawJson?: any;
  }) {
    return this.prisma.webhookEvent.create({
      data: {
        externalId: input.externalId || null,
        type: input.type,
        signature: input.signature || null,
        rawBody: input.rawBody || null,
        rawJson: input.rawJson ?? null,
        status: 'received',
      },
    });
  }

  async markProcessed(id: string) {
    return this.prisma.webhookEvent.update({
      where: { id },
      data: { status: 'processed', processedAt: new Date(), error: null },
    });
  }

  async markError(id: string, error: string) {
    return this.prisma.webhookEvent.update({
      where: { id },
      data: { status: 'error', error },
    });
  }
}

