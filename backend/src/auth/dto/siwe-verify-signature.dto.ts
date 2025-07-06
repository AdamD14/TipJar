// src/auth/dto/siwe-verify-signature.dto.ts
import { IsNotEmpty, IsString, IsEthereumAddress } from 'class-validator';

export class SiweVerifySignatureDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  signature: string;

  @IsNotEmpty()
  @IsString()
  @IsEthereumAddress()
  address: string;
}
