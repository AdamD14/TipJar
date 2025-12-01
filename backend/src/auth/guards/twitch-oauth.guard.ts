import { Injectable, ExecutionContext, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class TwitchOAuthGuard extends AuthGuard('twitch') {
    private readonly logger = new Logger(TwitchOAuthGuard.name);

    getAuthenticateOptions(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        // Przekazujemy state otrzymany z frontendu dalej do Twitcha
        return {
            state: req.query.state,
        };
    }
}
