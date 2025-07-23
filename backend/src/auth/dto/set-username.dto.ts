import {
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsObject,
  Matches,
  MinLength,
  MaxLength,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class ConsentsDto {
  @IsBoolean()
  terms: boolean;

  @IsBoolean()
  privacy: boolean;

  @IsBoolean()
  age: boolean;

  @IsOptional()
  @IsBoolean()
  marketing?: boolean;

  @IsOptional()
  @IsBoolean()
  usTax?: boolean;

  @IsOptional()
  @IsBoolean()
  usTerms?: boolean;
}

export class SetUsernameDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  @Matches(/^[A-Za-z0-9_]+$/, {
    message: 'Username can only contain letters, numbers, and underscores.',
  })
  username: string;

  @IsObject()
  @ValidateNested()
  @Type(() => ConsentsDto)
  consents: ConsentsDto;
}
