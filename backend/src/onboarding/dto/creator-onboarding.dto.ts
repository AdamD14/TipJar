import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  MaxLength,
  IsNumber,
  Min,
} from 'class-validator';

export class CreatorStep1Dto {
  @IsString()
  @IsNotEmpty()
  industry: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;
}

export class CreatorStep2Dto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(280)
  bio: string;

  @IsString()
  @IsNotEmpty()
  goalLabel: string;

  @IsNumber()
  @Min(1)
  goalTarget: number;

  @IsString()
  @IsOptional()
  currency?: string = 'USDC';
}
