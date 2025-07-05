import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GeneratorService } from './generator.service';
import { GeneratorController } from './generator.controller';

@Module({
  imports: [ConfigModule],
  controllers: [GeneratorController],
  providers: [GeneratorService],
  exports: [GeneratorService],
})
export class GeneratorModule {}
