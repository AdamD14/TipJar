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
  bio?: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsString()
  @IsOptional()
  websiteUrl?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  industries?: string[]; // Selected industries/niches from Step 3

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  connectedSocials?: string[]; // Connected social platform IDs
}

export class CreatorStep4Dto {
  @IsString()
  @IsNotEmpty()
  goalLabel: string;

  @IsNumber()
  goalTarget: number;
}
