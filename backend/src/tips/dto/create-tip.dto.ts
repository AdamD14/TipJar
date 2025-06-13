import { IsString, IsNotEmpty, IsDecimal, IsOptional, IsUUID, IsBoolean } from 'class-validator';

export class CreateTipDto {
  @IsDecimal({ decimal_digits: '2,6' }, { message: 'Kwota musi być liczbą dziesiętną.' })
  @IsNotEmpty({ message: 'Kwota jest wymagana.' })
  amount: string;

  @IsUUID('4', { message: 'Nieprawidłowy format ID twórcy.' })
  @IsNotEmpty({ message: 'ID twórcy jest wymagane.' })
  creatorId: string;

  @IsString()
  @IsOptional()
  message?: string;

  @IsBoolean()
  @IsOptional()
  isAnonymous?: boolean;
}

export class CreateGuestTipDto extends CreateTipDto {
  @IsString()
  @IsNotEmpty()
  paymentGatewayToken: string;
}
