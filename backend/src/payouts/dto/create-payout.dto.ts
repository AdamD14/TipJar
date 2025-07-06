import { IsString, IsNotEmpty, IsDecimal } from 'class-validator';

export class CreatePayoutDto {
  @IsDecimal({ decimal_digits: '2,6' })
  @IsNotEmpty()
  amount!: string;

  @IsString()
  @IsNotEmpty()
  destinationAddress!: string;
}
