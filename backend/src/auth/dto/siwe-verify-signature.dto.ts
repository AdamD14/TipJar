// src/auth/dto/siwe-verify-signature.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class SiweVerifySignatureDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  signature: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}
