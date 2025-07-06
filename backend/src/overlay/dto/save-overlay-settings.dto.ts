import { IsString, IsNumber, IsOptional, IsInt } from 'class-validator';

export class SaveOverlaySettingsDto {
  @IsString()
  position: string;

  @IsNumber()
  opacity: number;

  @IsString()
  bgColor: string;

  @IsString()
  textColor: string;

  @IsInt()
  durationSec: number;

  @IsString()
  fontFamily: string;

  @IsString()
  entryAnimation: string;

  @IsInt()
  specialEffectThreshold: number;

  @IsString()
  specialEffectType: string;

  @IsString()
  @IsOptional()
  soundEffectUrl?: string;
}
