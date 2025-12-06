import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsNumber,
  Min,
  IsIn,
} from 'class-validator';

export class Step2Dto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(280, { message: 'Bio is too long. Maximum is 280 characters.' })
  bio: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'Goal label should be concise.' })
  goalLabel: string;

  @IsNumber()
  @Min(1, { message: 'Goal target must be at least 1 USDC.' })
  goalTarget: number;

  @IsString()
  @IsIn(['USDC'], { message: 'Only USDC currency is supported at this time.' })
  currency: string = 'USDC';
}
