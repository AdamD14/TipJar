import {
  IsNotEmpty,
  IsString,
  Matches,
  IsEthereumAddress,
  IsOptional,
  IsEnum, // <<< DODAJEMY IMPORT
} from 'class-validator';
import { UserRole } from '@prisma/client'; // <<< DODAJEMY IMPORT

export class SiweRequestNonceDto {
  @IsNotEmpty()
  @IsString()
  @IsEthereumAddress()
  @Matches(/^0x[a-fA-F0-9]{40}$/, { message: 'Niepoprawny adres Ethereum.' })
  address: string;

  @IsOptional() // <<< Oznacza, że pole nie jest wymagane
  @IsEnum(UserRole) // <<< Sprawdza, czy wartość to 'CREATOR' lub 'FAN'
  role?: UserRole; // <<< DODAJEMY NOWE POLE
}