import { IsArray, IsOptional, IsString } from 'class-validator';

export class FanOnboardingStep2Dto {
  @IsArray()
  @IsString({ each: true })
  interests: string[];

  @IsOptional()
  @IsString()
  displayName?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;
}

