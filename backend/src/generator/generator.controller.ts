import { Body, Controller, Post } from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { GenerateHashtagsDto } from './dto';

@Controller('generate')
export class GeneratorController {
  constructor(private readonly generatorService: GeneratorService) {}

  @Post('hashtags')
  async generateHashtags(@Body() dto: GenerateHashtagsDto) {
    const hashtags = await this.generatorService.generateHashtags(
      dto.topic,
      dto.platform,
      dto.generator,
    );
    return { hashtags };
  }
}
