import {
  Controller,
  Post,
  Get,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OnboardingService } from './onboarding.service';
import { CreatorStep1Dto, CreatorStep2Dto } from './dto/creator-onboarding.dto';

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

@Controller('api/onboarding')
@UseGuards(AuthGuard('jwt'))
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Get('creator/status')
  async getStatus(@Request() req: AuthenticatedRequest) {
    return this.onboardingService.getCreatorStatus(req.user.id);
  }

  // STEP 1 – identity (upsert)
  @Post('creator/step1')
  async step1(
    @Request() req: AuthenticatedRequest,
    @Body() dto: CreatorStep1Dto,
  ) {
    return this.onboardingService.saveCreatorStep1(req.user.id, dto);
  }

  // STEP 2 – bio + goal (upsert)
  @Post('creator/step2')
  async step2(
    @Request() req: AuthenticatedRequest,
    @Body() dto: CreatorStep2Dto,
  ) {
    return this.onboardingService.saveCreatorStep2(req.user.id, dto);
  }

  @Post('uploads/presigned-url')
  async getPresignedUrl(
    @Request() req: AuthenticatedRequest,
    @Body() body: { filename: string; contentType: string },
  ) {
    return this.onboardingService.getUploadUrl(
      req.user.id,
      body.filename,
      body.contentType,
    );
  }
}