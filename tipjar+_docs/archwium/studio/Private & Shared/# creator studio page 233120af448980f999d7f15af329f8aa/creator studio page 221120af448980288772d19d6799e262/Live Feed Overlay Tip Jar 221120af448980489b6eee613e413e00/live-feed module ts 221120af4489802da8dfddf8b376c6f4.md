# live-feed.module.ts

import { Module } from '@nestjs/common';
import { LiveFeedGateway } from './live-feed.gateway';

@Module({
providers: [LiveFeedGateway],
exports: [LiveFeedGateway],
})
export class LiveFeedModule {}