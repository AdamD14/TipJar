import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InternalApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-internal-api-key'];
    const expectedApiKey = this.configService.get<string>('NESTJS_SECRET_KEY');

    if (!apiKey || apiKey !== expectedApiKey) {
      throw new UnauthorizedException('Invalid or missing Internal API Key');
    }

    return true;
  }
}
