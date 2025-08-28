import { Controller, Get, Query } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole, Prisma } from '@prisma/client';

type CreatorRow = {
  id: string;
  username: string | null;
  displayName: string;
  avatarUrl: string | null;
  bio?: string | null;
};

@Controller('creators')
export class CreatorsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list(
    @Query('q') q?: string,
    @Query('page') pageStr?: string,
    @Query('pageSize') pageSizeStr?: string,
  ): Promise<{ items: CreatorRow[]; page: number; pageSize: number; total: number }> {
    const page = Math.max(1, parseInt(pageStr || '1', 10));
    const pageSize = Math.min(50, Math.max(1, parseInt(pageSizeStr || '20', 10)));
    const where: Prisma.UserWhereInput = {
      role: UserRole.CREATOR,
      isActive: true,
      ...(q
        ? {
            OR: [
              { username: { contains: q, mode: 'insensitive' } },
              { displayName: { contains: q, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    const [total, users] = await this.prisma.$transaction([
      this.prisma.user.count({ where }),
      this.prisma.user.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          username: true,
          displayName: true,
          avatarUrl: true,
          profile: { select: { bio: true } },
        },
      }),
    ]);

    const items: CreatorRow[] = users.map((u) => ({
      id: u.id,
      username: u.username,
      displayName: u.displayName,
      avatarUrl: u.avatarUrl,
      bio: u.profile?.bio ?? null,
    }));

    return { items, page, pageSize, total };
  }
}

