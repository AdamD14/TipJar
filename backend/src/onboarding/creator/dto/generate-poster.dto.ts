import { IsOptional, IsString, IsEnum, MaxLength } from 'class-validator';

export enum PosterStyle {
  DEFAULT = 'default',
  MINIMAL = 'minimal',
  BOLD = 'bold',
}

export class GeneratePosterDto {
  // Allows the frontend to request a specific style in the future
  // Defaults to DEFAULT when not provided
  @IsEnum(PosterStyle)
  @IsOptional()
  style?: PosterStyle = PosterStyle.DEFAULT;

  // Optional custom tagline to override AI generation
  @IsString()
  @IsOptional()
  @MaxLength(100)
  customTagline?: string;
}
