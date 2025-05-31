// src/auth/dto/register-user.dto.ts
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  displayName: string;

  // Dla przyszłości: rola (opcjonalnie, domyślnie FAN)
  // role?: string;
}
