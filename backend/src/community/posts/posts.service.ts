// backend/src/community/posts/posts.service.ts
// Owns every Feed business rule so the controller stays a thin HTTP layer:
// - UPDATE posts are capped at 280 chars and can't carry mediaUrls.
// - MEDIA posts are capped at 10 mediaUrls, POST at 5.
// - Max 2 pinned posts per creator (oldest pin is NOT auto-unpinned —
//   the request is rejected so the creator makes an explicit choice).
// - ANNOUNCEMENT posts can't receive reactions.
// - SUBSCRIBERS_ONLY gating is deferred until the Memberships module
//   exists — see getPublicFeed().

import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Post, PostType, PostVisibility, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

const MAX_PINNED_POSTS = 2;
const UPDATE_MAX_LENGTH = 280;
const MEDIA_MAX_ITEMS = 10;
const POST_MAX_ITEMS = 5;
const VALID_EMOJI = new Set(['heart', 'fire', 'clap']);

export interface ReactionCounts {
  heart: number;
  fire: number;
  clap: number;
  viewerReacted: string[]; // emoji list the current viewer already used
}

export type PostWithReactions = Post & { reactionCounts: ReactionCounts };

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(creatorId: string, dto: CreatePostDto): Promise<Post> {
    this.validateTypeConstraints(dto.type, dto);

    return this.prisma.post.create({
      data: {
        creatorId,
        type: dto.type,
        content: dto.content,
        mediaUrls: dto.mediaUrls ?? [],
        linkUrl: dto.linkUrl,
        tags: dto.tags ?? [],
        visibility: dto.visibility ?? PostVisibility.PUBLIC,
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
      },
    });
  }

  async update(creatorId: string, postId: string, dto: UpdatePostDto): Promise<Post> {
    const post = await this.getOwnedPostOrThrow(creatorId, postId);

    this.validateTypeConstraints(post.type, {
      content: dto.content ?? post.content,
      mediaUrls: dto.mediaUrls ?? post.mediaUrls,
    });

    return this.prisma.post.update({
      where: { id: postId },
      data: {
        content: dto.content,
        mediaUrls: dto.mediaUrls,
        linkUrl: dto.linkUrl,
        tags: dto.tags,
        visibility: dto.visibility,
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined,
      },
    });
  }

  async delete(creatorId: string, postId: string): Promise<void> {
    await this.getOwnedPostOrThrow(creatorId, postId);
    await this.prisma.post.delete({ where: { id: postId } });
  }

  async togglePin(creatorId: string, postId: string): Promise<Post> {
    const post = await this.getOwnedPostOrThrow(creatorId, postId);

    if (!post.isPinned) {
      const pinnedCount = await this.prisma.post.count({
        where: { creatorId, isPinned: true },
      });
      if (pinnedCount >= MAX_PINNED_POSTS) {
        throw new BadRequestException(
          `You can only pin up to ${MAX_PINNED_POSTS} posts. Unpin one first.`,
        );
      }
    }

    return this.prisma.post.update({
      where: { id: postId },
      data: { isPinned: !post.isPinned },
    });
  }

  /** Owner's own dashboard feed — includes drafts, all visibilities. */
  async getOwnFeed(
    creatorId: string,
    page = 1,
    limit = 20,
  ): Promise<{ posts: Post[]; total: number }> {
    const skip = (page - 1) * limit;
    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        where: { creatorId },
        orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
      }),
      this.prisma.post.count({ where: { creatorId } }),
    ]);
    return { posts, total };
  }

  /**
   * Public/visitor feed. Excludes DRAFT always. Excludes SUBSCRIBERS_ONLY
   * entirely for now — there is no Membership model yet to check tier
   * access against, so we don't fake a gate. Revisit once Memberships
   * ships.
   */
  async getPublicFeed(
    creatorId: string,
    page = 1,
    limit = 20,
  ): Promise<{ posts: Post[]; total: number }> {
    const skip = (page - 1) * limit;
    const where: Prisma.PostWhereInput = {
      creatorId,
      visibility: PostVisibility.PUBLIC,
    };

    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        where,
        orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
      }),
      this.prisma.post.count({ where }),
    ]);
    return { posts, total };
  }

  async addReaction(userId: string, postId: string, emoji: string): Promise<void> {
    if (!VALID_EMOJI.has(emoji)) {
      throw new BadRequestException(`Invalid reaction: ${emoji}`);
    }

    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new NotFoundException('Post not found.');
    if (post.type === PostType.ANNOUNCEMENT) {
      throw new ForbiddenException('Announcements cannot receive reactions.');
    }

    try {
      await this.prisma.reaction.create({
        data: { postId, userId, emoji },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        // Already reacted with this emoji — idempotent no-op.
        return;
      }
      throw error;
    }
  }

  async removeReaction(userId: string, postId: string, emoji: string): Promise<void> {
    await this.prisma.reaction.deleteMany({
      where: { postId, userId, emoji },
    });
  }

  async getReactionCounts(postId: string, viewerId?: string): Promise<ReactionCounts> {
    const reactions = await this.prisma.reaction.findMany({
      where: { postId },
      select: { emoji: true, userId: true },
    });

    const counts: ReactionCounts = { heart: 0, fire: 0, clap: 0, viewerReacted: [] };
    for (const r of reactions) {
      if (r.emoji in counts) {
        (counts as unknown as Record<string, number>)[r.emoji]++;
      }
      if (viewerId && r.userId === viewerId) {
        counts.viewerReacted.push(r.emoji);
      }
    }
    return counts;
  }

  /** One query for a whole page of posts instead of one query per card. */
  async getReactionCountsBatch(
    postIds: string[],
    viewerId?: string,
  ): Promise<Map<string, ReactionCounts>> {
    const result = new Map<string, ReactionCounts>();
    if (postIds.length === 0) return result;

    const reactions = await this.prisma.reaction.findMany({
      where: { postId: { in: postIds } },
      select: { postId: true, emoji: true, userId: true },
    });

    for (const id of postIds) {
      result.set(id, { heart: 0, fire: 0, clap: 0, viewerReacted: [] });
    }
    for (const r of reactions) {
      const bucket = result.get(r.postId);
      if (!bucket) continue;
      if (r.emoji in bucket) {
        (bucket as unknown as Record<string, number>)[r.emoji]++;
      }
      if (viewerId && r.userId === viewerId) {
        bucket.viewerReacted.push(r.emoji);
      }
    }
    return result;
  }

  private async getOwnedPostOrThrow(creatorId: string, postId: string): Promise<Post> {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw new NotFoundException('Post not found.');
    if (post.creatorId !== creatorId) {
      throw new ForbiddenException('You do not own this post.');
    }
    return post;
  }

  private validateTypeConstraints(
    type: PostType,
    payload: { content: string; mediaUrls?: string[] },
  ): void {
    if (type === PostType.UPDATE) {
      if (payload.content.length > UPDATE_MAX_LENGTH) {
        throw new BadRequestException(
          `Updates are limited to ${UPDATE_MAX_LENGTH} characters.`,
        );
      }
      if (payload.mediaUrls && payload.mediaUrls.length > 0) {
        throw new BadRequestException('Updates cannot have media attachments.');
      }
    }

    if (type === PostType.MEDIA && (payload.mediaUrls?.length ?? 0) > MEDIA_MAX_ITEMS) {
      throw new BadRequestException(`Media posts allow up to ${MEDIA_MAX_ITEMS} items.`);
    }

    if (type === PostType.POST && (payload.mediaUrls?.length ?? 0) > POST_MAX_ITEMS) {
      throw new BadRequestException(`Posts allow up to ${POST_MAX_ITEMS} images.`);
    }
  }
}
