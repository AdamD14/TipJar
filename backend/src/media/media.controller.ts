import { Controller, Post, Body, Headers, UnauthorizedException, UsePipes, ValidationPipe } from '@nestjs/common';
import { MediaService } from './media.service';
import { ReserveSlotDto, ConfirmUploadDto } from './dto/media.dto';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('reserve-slot')
  @UsePipes(new ValidationPipe())
  async reserve(@Body() dto: ReserveSlotDto, @Headers('x-internal-api-key') apiKey: string) {
    this.checkAuth(apiKey);
    return await this.mediaService.reserveAvatarSlot(dto);
  }

  @Post('confirm-upload')
  @UsePipes(new ValidationPipe())
  async confirm(@Body() dto: ConfirmUploadDto, @Headers('x-internal-api-key') apiKey: string) {
    this.checkAuth(apiKey);
    return await this.mediaService.confirmUpload(dto);
  }

  private checkAuth(key: string) {
    if (key !== process.env.NESTJS_SECRET_KEY) {
      throw new UnauthorizedException('Invalid Internal Secret');
    }
  }
}