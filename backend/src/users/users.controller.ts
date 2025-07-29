import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
// <<< POPRAWKA 1: Poprawiona ścieżka do DTO
import { SetUsernameDto } from '../auth/dto/set-username.dto';
import { Request } from 'express';
// <<< POPRAWKA 2: Importujemy typ ValidatedUser zamiast go re-definiować
import { ValidatedUser } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private usersService: UsersService) {}

  @Get('username-check')
  @HttpCode(HttpStatus.OK)
  async checkUsername(
    @Query('username') username: string,
  ): Promise<{ available: boolean }> {
    if (!username || username.length < 3) {
      return { available: false };
    }
    const user = await this.usersService.findByUsername(username);
    return { available: !user };
  }

  @Post('set-username')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async setUsername(
    @Req() req: Request,
    @Body() body: SetUsernameDto,
  ): Promise<{ message: string }> {
    // req.user jest już poprawnie typowany przez Passport, ale dla pewności możemy rzutować
    const user = req.user as ValidatedUser;
    if (!user) {
      this.logger.error('No user object found on request in setUsername');
      throw new UnauthorizedException();
    }
    this.logger.log(`User ${user.id} is setting username to ${body.username}`);
    await this.usersService.setUsernameAndConsents(user.id, body);
    return { message: 'Username and consents updated successfully.' };
  }
}
