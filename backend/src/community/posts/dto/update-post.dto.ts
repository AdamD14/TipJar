// backend/src/community/posts/dto/update-post.dto.ts
// Validates the payload for PATCH /api/v1/community/posts/:id.
// Type is intentionally NOT editable — changing POST into ANNOUNCEMENT
// after the fact would bypass the reaction/pin rules tied to each type.
// Delete and recreate if the type needs to change.

import {
  IsString,
  IsOptional,
  IsArray,
  ArrayMaxSize,
  MaxLength,
  IsUrl,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { PostVisibility } from '@prisma/client';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  content?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsUrl({}, { each: true })
  mediaUrls?: string[];

  @IsOptional()
  @IsUrl()
  linkUrl?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5)
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsEnum(PostVisibility)
  visibility?: PostVisibility;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}
