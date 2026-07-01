import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';

export interface FollowerRow {
  id: string;
  username: string | null;
  displayName: string;
  avatarUrl: string | null;
  followedAt: string;
}

@Injectable()
export class FollowsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService,
  ) {}

  async follow(
    followerId: string,
    followingId: string,
  ): Promise<{ following: boolean }> {
    if (followerId === followingId) {
      throw new BadRequestException('You cannot follow yourself.');
    }

    const target = await this.prisma.user.findUnique({
      where: { id: followingId },
      select: { id: true },
    });
    if (!target) throw new NotFoundException('User not found.');

    try {
      await this.prisma.follow.create({
        data: { followerId, followingId },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        // Already following — idempotent success, no duplicate notification.
        return { following: true };
      }
      throw error;
    }

    const follower = await this.prisma.user.findUnique({
      where: { id: followerId },
      select: { displayName: true, username: true },
    });

    await this.notificationService.create({
      userId: followingId,
      title: 'New follower',
      message: `${follower?.displayName || follower?.username || 'Someone'} started following you.`,
      type: 'follow',
    });

    return { following: true };
  }

  async unfollow(
    followerId: string,
    followingId: string,
  ): Promise<{ following: boolean }> {
    await this.prisma.follow.deleteMany({
      where: { followerId, followingId },
    });
    return { following: false };
  }

  async getStatus(
    followerId: string,
    followingId: string,
  ): Promise<{ following: boolean }> {
    const existing = await this.prisma.follow.findUnique({
      where: { followerId_followingId: { followerId, followingId } },
    });
    return { following: !!existing };
  }

  async getCount(followingId: string): Promise<{ count: number }> {
    const count = await this.prisma.follow.count({ where: { followingId } });
    return { count };
  }

  async getFollowers(
    followingId: string,
    page = 1,
    limit = 20,
  ): Promise<{ followers: FollowerRow[]; total: number }> {
    const skip = (page - 1) * limit;

    const [rows, total] = await Promise.all([
      this.prisma.follow.findMany({
        where: { followingId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          createdAt: true,
          follower: {
            select: {
              id: true,
              username: true,
              displayName: true,
              avatarUrl: true,
            },
          },
        },
      }),
      this.prisma.follow.count({ where: { followingId } }),
    ]);

    const followers = rows.map((r) => ({
      id: r.follower.id,
      username: r.follower.username,
      displayName: r.follower.displayName,
      avatarUrl: r.follower.avatarUrl,
      followedAt: r.createdAt.toISOString(),
    }));

    return { followers, total };
  }
}
