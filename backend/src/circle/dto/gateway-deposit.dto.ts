import { IsDecimal, IsNotEmpty } from 'class-validator';

export class GatewayDepositDto {
  @IsDecimal({ decimal_digits: '2,6' })
  @IsNotEmpty()
  amount!: string;
}
