import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/** Publiczny kształt zwracany przez API (zero `any`). */
export type NotificationRow = {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
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
    title: string;
    message: string;
    type: string;
    read: boolean;
    createdAt: Date;
  }): NotificationRow {
    return {
      id: n.id,
      userId: n.userId,
      title: n.title,
      message: n.message,
      type: n.type,
      read: n.read,
      createdAt: n.createdAt,
    };
  }

  /** Utwórz powiadomienie. Zwraca NotificationRow. */
  async create(data: {
    userId: string;
    title: string;
    message: string;
    type: string;
  }): Promise<NotificationRow> {
    const created = await this.prisma.notification.create({
      data: { userId: data.userId, title: data.title, message: data.message, type: data.type },
      select: {
        id: true,
        userId: true,
        title: true,
        message: true,
        type: true,
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
        title: true,
        message: true,
        type: true,
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
