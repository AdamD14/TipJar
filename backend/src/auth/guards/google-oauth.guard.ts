import { Injectable, ExecutionContext, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleOAuthGuard extends AuthGuard('google') {
    private readonly logger = new Logger(GoogleOAuthGuard.name);

    getAuthenticateOptions(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        // Przekazujemy state otrzymany z frontendu dalej do Google
        return {
            state: req.query.state,
        };
    }
}
