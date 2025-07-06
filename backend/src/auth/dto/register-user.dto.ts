// src/auth/dto/register-user.dto.ts
import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  displayName: string;

  // Dla przyszłości: rola (opcjonalnie, domyślnie FAN)
  // role?: string;
}
