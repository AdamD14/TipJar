import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../../auth/user.decorator';
import { ValidatedUser } from '../../auth/auth.service';
import { FanOnboardingService } from './fan-onboarding.service';
import { FanOnboardingStep2Dto } from './dto/fan-onboarding.dto';

@Controller('fan/onboarding')
@UseGuards(JwtAuthGuard)
export class FanOnboardingController {
  constructor(private readonly fanOnboardingService: FanOnboardingService) {}

  @Post('step-2')
  @HttpCode(HttpStatus.OK)
  async step2(@User() user: ValidatedUser, @Body() dto: FanOnboardingStep2Dto) {
    return this.fanOnboardingService.saveStep2(user.id, dto);
  }
}
