import { IsDecimal, IsNotEmpty, IsInt, IsString, Min } from 'class-validator';

export class GatewayTransferDto {
  @IsDecimal({ decimal_digits: '2,6' })
  @IsNotEmpty()
  amount!: string;

  @IsInt()
  @Min(0)
  destinationDomain!: number;

  @IsString()
  @IsNotEmpty()
  recipientAddress!: string;
}
