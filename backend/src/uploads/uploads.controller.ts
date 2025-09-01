import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/guards/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '@prisma/client';
import { UploadsService } from './uploads.service';

@Controller('uploads')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UploadsController {
  constructor(private readonly svc: UploadsService) {}

  @Post('sign')
  @Roles(UserRole.CREATOR, UserRole.FAN, UserRole.ADMIN)
  async sign(
    @Body()
    dto: { folder?: 'avatars' | 'covers' | 'assets'; filename: string; contentType: string },
  ) {
    const safe = (dto.filename || 'file').replace(/[^a-zA-Z0-9_.-]/g, '_');
    const key = `${dto.folder || 'assets'}/${Date.now()}_${safe}`;
    return this.svc.signPutUrl({ key, contentType: dto.contentType });
  }
}

