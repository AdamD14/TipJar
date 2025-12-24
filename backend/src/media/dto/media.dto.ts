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
  publicUrl: string;

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
  @IsString()
  userId: string;

  @IsNumber()
  @Min(0)
  @Max(2)
  slotId: number;
}
