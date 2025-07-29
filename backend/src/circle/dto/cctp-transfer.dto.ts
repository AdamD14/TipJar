import { IsString, IsNotEmpty, IsDecimal } from 'class-validator';

export class CctpTransferDto {
  @IsDecimal({ decimal_digits: '2,6' })
  @IsNotEmpty()
  amount!: string;

  @IsString()
  @IsNotEmpty()
  toChain!: string;

  @IsString()
  @IsNotEmpty()
  toAddress!: string;
}
