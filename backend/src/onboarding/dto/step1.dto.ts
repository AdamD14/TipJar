import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsArray,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// Enum mirroring the frontend constants for strict validation
export enum IndustryType {
  STREAMER = 'Streamer / Gaming',
  MUSIC = 'Music / DJ',
  EDUCATION = 'Education / Tutor',
  FITNESS = 'Fitness / Coach',
  CREATOR = 'Creator / Influencer',
  ART = 'Art / Design',
  COSPLAY = 'Cosplay / Modeling',
  PODCAST = 'Podcast / Radio',
  OTHER = 'Other',
}

class SocialConnectionDto {
  @IsString()
  @IsNotEmpty()
  provider: string;

  @IsString()
  @IsNotEmpty()
  handleOrUrl: string;
}

export class Step1Dto {
  @IsEnum(IndustryType, {
    message: 'Industry must be one of the predefined categories.',
  })
  @IsNotEmpty()
  industry: IndustryType;

  @IsUrl({}, { message: 'Avatar must be a valid URL.' })
  @IsOptional()
  avatarUrl?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SocialConnectionDto)
  socials?: SocialConnectionDto[];
}
