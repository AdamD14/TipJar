import {
  Controller,
  Post,
  Get,
  Body,
  Request,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OnboardingService } from './onboarding.service';
import {
  CreatorStep1Dto,
  CreatorStep2Dto,
  CreatorStep3Dto,
  CreatorStep4Dto,
} from './dto/creator-onboarding.dto';

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

@Controller('creator/onboarding')
@UseGuards(AuthGuard('jwt'))
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Get('status')
  async getStatus(@Request() req: AuthenticatedRequest) {
    return this.onboardingService.getCreatorStatus(req.user.id);
  }

  // STEP 1 – identity (UPSERT via PATCH as expected by frontend)
  // Was: @Post('creator/step-1')
  @Patch('identity')
  async step1(
    @Request() req: AuthenticatedRequest,
    @Body() dto: CreatorStep1Dto,
  ) {
    return this.onboardingService.saveCreatorStep1(req.user.id, dto);
  }

  // STEP 2 – avatar
  @Post('step-2')
  async step2(
    @Request() req: AuthenticatedRequest,
    @Body() dto: CreatorStep2Dto,
  ) {
    return this.onboardingService.saveCreatorStep2(req.user.id, dto);
  }

  // STEP 3 – bio + socials
  @Post('step-3')
  async step3(
    @Request() req: AuthenticatedRequest,
    @Body() dto: CreatorStep3Dto,
  ) {
    return this.onboardingService.saveCreatorStep3(req.user.id, dto);
  }

  // STEP 4 – goal
  @Post('step-4')
  async step4(
    @Request() req: AuthenticatedRequest,
    @Body() dto: CreatorStep4Dto,
  ) {
    return this.onboardingService.saveCreatorStep4(req.user.id, dto);
  }

  // STEP 5 – completion
  @Post('complete')
  async complete(@Request() req: AuthenticatedRequest) {
    return this.onboardingService.completeOnboarding(req.user.id);
  }
}
