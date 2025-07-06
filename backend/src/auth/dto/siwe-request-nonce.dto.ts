// src/auth/dto/siwe-request-nonce.dto.ts
import { IsNotEmpty, IsString, Matches, IsEthereumAddress } from 'class-validator';

export class SiweRequestNonceDto {
  @IsNotEmpty()
  @IsString()
  @IsEthereumAddress()
  // Prosty regex sprawdzający adres ETH (opcjonalnie, nie blokuje)
  @Matches(/^0x[a-fA-F0-9]{40}$/, { message: 'Niepoprawny adres Ethereum.' })
  address: string;
}
