import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { FollowsService, FollowerRow } from './follows.service';
import { ValidatedUser } from '../auth/auth.service';

@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post(':creatorId')
  @UseGuards(AuthGuard('jwt'))
  async follow(
    @Param('creatorId', ParseUUIDPipe) creatorId: string,
    @Req() req: Request,
  ): Promise<{ following: boolean }> {
    const user = req.user as ValidatedUser;
    return this.followsService.follow(user.id, creatorId);
  }

  @Delete(':creatorId')
  @UseGuards(AuthGuard('jwt'))
  async unfollow(
    @Param('creatorId', ParseUUIDPipe) creatorId: string,
    @Req() req: Request,
  ): Promise<{ following: boolean }> {
    const user = req.user as ValidatedUser;
    return this.followsService.unfollow(user.id, creatorId);
  }

  @Get(':creatorId/status')
  @UseGuards(AuthGuard('jwt'))
  async status(
    @Param('creatorId', ParseUUIDPipe) creatorId: string,
    @Req() req: Request,
  ): Promise<{ following: boolean }> {
    const user = req.user as ValidatedUser;
    return this.followsService.getStatus(user.id, creatorId);
  }

  @Get(':creatorId/count')
  async count(
    @Param('creatorId', ParseUUIDPipe) creatorId: string,
  ): Promise<{ count: number }> {
    return this.followsService.getCount(creatorId);
  }

  @Get(':creatorId')
  async followers(
    @Param('creatorId', ParseUUIDPipe) creatorId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<{ followers: FollowerRow[]; total: number }> {
    const p = Math.max(1, parseInt(page ?? '1', 10) || 1);
    const l = Math.min(50, Math.max(1, parseInt(limit ?? '20', 10) || 20));
    return this.followsService.getFollowers(creatorId, p, l);
  }
}
