// src/auth/dto/register-user.dto.ts
import {
  IsEmail,
  IsString,
  MinLength,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { UserRole } from '@prisma/client';

export class RegisterUserDto {
  @IsEmail({}, { message: 'Enter a valid email address' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @IsEnum(UserRole, { message: 'Role must be either FAN or CREATOR' })
  @IsNotEmpty({ message: 'Role is required' })
  role: UserRole;
}
