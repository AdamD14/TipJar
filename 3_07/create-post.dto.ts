// backend/src/community/posts/dto/create-post.dto.ts
// Validates the payload for POST /api/v1/community/posts.

import {
  IsEnum,
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  ArrayMaxSize,
  MaxLength,
  IsUrl,
  IsDateString,
} from 'class-validator';
import { PostType, PostVisibility } from '@prisma/client';

export class CreatePostDto {
  @IsEnum(PostType)
  type: PostType;

  @IsString()
  @MaxLength(5000) // hard ceiling; UPDATE type is further limited to 280 in the service
  content: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10) // MEDIA cap; POST is capped at 5 in the service
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
  expiresAt?: string; // ANNOUNCEMENT only
}
