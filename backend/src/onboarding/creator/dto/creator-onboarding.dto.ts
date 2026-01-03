import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
} from 'class-validator';

export class CreatorStep1Dto {
  @IsString()
  @IsOptional()
  archetype?: string;

  @IsString()
  @IsNotEmpty()
  industry: string;
}

export class CreatorStep2Dto {
  @IsString()
  @IsOptional()
  avatarUrl?: string;
}

export class CreatorStep3Dto {
  @IsString()
  @IsOptional()
  displayName?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  specializations?: string[]; // Selected specializations from Step 3

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  connectedSocials?: string[]; // Connected social platform IDs (twitch, etc.)
}

export class CreatorStep4Dto {
  @IsString()
  @IsNotEmpty()
  goalLabel: string;

  @IsNumber()
  goalTarget: number;

  @IsString()
  @IsOptional()
  goalDeadline?: string; // Optional deadline date string (YYYY-MM-DD)
}
