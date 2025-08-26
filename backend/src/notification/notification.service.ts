import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/** Publiczny kształt zwracany przez API (zero `any`). */
export type NotificationRow = {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: Date;
};

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  /** Mapowanie selektu Prisma → kształt publiczny. */
  private toRow(n: {
    id: string;
    userId: string;
    message: string;
    read: boolean;
    createdAt: Date;
  }): NotificationRow {
    return {
      id: n.id,
      userId: n.userId,
      message: n.message,
      read: n.read,
      createdAt: n.createdAt,
    };
  }

  /** Utwórz powiadomienie. Zwraca NotificationRow. */
  async create(data: {
    userId: string;
    message: string;
  }): Promise<NotificationRow> {
    const created = await this.prisma.notification.create({
      data: { userId: data.userId, message: data.message },
      // jawny select => silnie typowany wynik, bez potrzeby importu modelu
      select: {
        id: true,
        userId: true,
        message: true,
        read: true,
        createdAt: true,
      },
    });
    return this.toRow(created);
  }

  /** Lista powiadomień użytkownika (najnowsze na górze). */
  async getUserNotifications(userId: string): Promise<NotificationRow[]> {
    const rows = await this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        userId: true,
        message: true,
        read: true,
        createdAt: true,
      },
    });
    return rows.map((n) => this.toRow(n));
  }

  /** Oznacz wszystkie jako przeczytane — zwraca liczbę zmodyfikowanych rekordów. */
  async markAllAsRead(userId: string): Promise<number> {
    const { count } = await this.prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
    return count;
  }
}
