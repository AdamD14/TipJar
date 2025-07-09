// src/auth/dto/register-user.dto.ts
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { UserRole } from '@prisma/client'; // Upewnij się, że UserRole jest importowane z Prisma

export class RegisterUserDto {
  @IsEmail({}, { message: 'Enter a valid email address' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @IsString({ message: 'Display name must be a string' })
  displayName: string;

  @IsOptional()
  role?: UserRole; // Dodano pole 'role'
}
