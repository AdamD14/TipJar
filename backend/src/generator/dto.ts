import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GenerateHashtagsDto {
  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsString()
  @IsIn(['instagram', 'twitter', 'facebook', 'linkedin'])
  platform: string;

  @IsString()
  @IsOptional()
  generator?: string;
}
