import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class ReserveSlotDto {
  @IsString()
  userId: string;

  @IsNumber()
  @Min(0)
  @Max(2)
  slotId: number;

  @IsString()
  s3Key: string;

  @IsString()
  originalUrl: string;

  @IsOptional()
  @IsString()
  fileName?: string;

  @IsOptional()
  @IsString()
  contentType?: string;

  @IsOptional()
  @IsNumber()
  size?: number;
}

export class ConfirmUploadDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(2)
  slotId?: number;

  @IsOptional()
  @IsString()
  s3Key?: string;

  @IsOptional()
  @IsString()
  etag?: string;
}
