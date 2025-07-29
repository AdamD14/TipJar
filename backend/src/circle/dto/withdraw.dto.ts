import { IsString, IsNotEmpty, IsDecimal } from 'class-validator';

export class WithdrawDto {
  @IsDecimal({ decimal_digits: '2,6' })
  @IsNotEmpty()
  amount!: string;

  @IsString()
  @IsNotEmpty()
  toAddress!: string;
}
