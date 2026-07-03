// backend/src/community/posts/posts.controller.ts
// Routes:
//   GET    /api/v1/community/posts/:creatorId/public   — visitor feed (no auth)
//   GET    /api/v1/community/posts/mine                — own dashboard feed (auth, includes drafts)
//   POST   /api/v1/community/posts                     — create (auth)
//   PATCH  /api/v1/community/posts/:id                 — edit own post (auth)
//   DELETE /api/v1/community/posts/:id                 — delete own post (auth)
//   PATCH  /api/v1/community/posts/:id/pin             — toggle pin (auth)
//   POST   /api/v1/community/posts/:id/reactions       — react (auth)
//   DELETE /api/v1/community/posts/:id/reactions/:emoji — remove reaction (auth)

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post as HttpPost,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Post as PostModel } from '@prisma/client';

import { PostsService, PostWithReactions } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ValidatedUser } from '../../auth/auth.service';

type FeedResponse = { posts: PostWithReactions[]; total: number };

@Controller('community/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':creatorId/public')
  async getPublicFeed(
    @Param('creatorId') creatorId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<FeedResponse> {
    const { posts, total } = await this.postsService.getPublicFeed(
      creatorId,
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 20,
    );
    return this.attachReactionCounts(posts, total);
  }

  @Get('mine')
  @UseGuards(AuthGuard('jwt'))
  async getOwnFeed(
    @Req() req: Request,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<FeedResponse> {
    const user = req.user as ValidatedUser;
    const { posts, total } = await this.postsService.getOwnFeed(
      user.id,
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 20,
    );
    return this.attachReactionCounts(posts, total, user.id);
  }

  @HttpPost()
  @UseGuards(AuthGuard('jwt'))
  async create(@Req() req: Request, @Body() dto: CreatePostDto): Promise<PostModel> {
    const user = req.user as ValidatedUser;
    return this.postsService.create(user.id, dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() dto: UpdatePostDto,
  ): Promise<PostModel> {
    const user = req.user as ValidatedUser;
    return this.postsService.update(user.id, id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Req() req: Request, @Param('id') id: string): Promise<{ deleted: true }> {
    const user = req.user as ValidatedUser;
    await this.postsService.delete(user.id, id);
    return { deleted: true };
  }

  @Patch(':id/pin')
  @UseGuards(AuthGuard('jwt'))
  async togglePin(@Req() req: Request, @Param('id') id: string): Promise<PostModel> {
    const user = req.user as ValidatedUser;
    return this.postsService.togglePin(user.id, id);
  }

  @HttpPost(':id/reactions')
  @UseGuards(AuthGuard('jwt'))
  async addReaction(
    @Req() req: Request,
    @Param('id') id: string,
    @Body('emoji') emoji: string,
  ): Promise<{ ok: true }> {
    const user = req.user as ValidatedUser;
    await this.postsService.addReaction(user.id, id, emoji);
    return { ok: true };
  }

  @Delete(':id/reactions/:emoji')
  @UseGuards(AuthGuard('jwt'))
  async removeReaction(
    @Req() req: Request,
    @Param('id') id: string,
    @Param('emoji') emoji: string,
  ): Promise<{ ok: true }> {
    const user = req.user as ValidatedUser;
    await this.postsService.removeReaction(user.id, id, emoji);
    return { ok: true };
  }

  private async attachReactionCounts(
    posts: PostModel[],
    total: number,
    viewerId?: string,
  ): Promise<FeedResponse> {
    const countsMap = await this.postsService.getReactionCountsBatch(
      posts.map((p) => p.id),
      viewerId,
    );
    const withCounts: PostWithReactions[] = posts.map((p) => ({
      ...p,
      reactionCounts: countsMap.get(p.id) ?? {
        heart: 0,
        fire: 0,
        clap: 0,
        viewerReacted: [],
      },
    }));
    return { posts: withCounts, total };
  }
}
