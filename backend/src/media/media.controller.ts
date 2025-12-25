import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { ConfirmUploadDto, ReserveSlotDto } from './dto/media.dto';
import { InternalApiKeyGuard } from '../auth/guards/internal-api-key.guard';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('reserve-slot')
  @UseGuards(InternalApiKeyGuard)
  @UsePipes(new ValidationPipe())
  async reserve(@Body() dto: ReserveSlotDto) {
    return await this.mediaService.reserveAvatarSlot(dto);
  }

  @Post('confirm-upload')
  @UseGuards(InternalApiKeyGuard)
  @UsePipes(new ValidationPipe())
  async confirm(@Body() dto: ConfirmUploadDto) {
    return await this.mediaService.confirmUpload(dto);
  }
}
