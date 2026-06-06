import { Module, Global } from '@nestjs/common';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';
import { RedisSubscriberService } from './redis-subscriber.service';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const url =
          configService.get<string>('REDIS_URL') || 'redis://localhost:6379';
        const client = createClient({ url });
        await client.connect();
        return client;
      },
      inject: [ConfigService],
    },
    {
      provide: 'REDIS_SUB_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const url =
          configService.get<string>('REDIS_URL') || 'redis://localhost:6379';
        const client = createClient({ url });
        await client.connect();
        return client;
      },
      inject: [ConfigService],
    },
    RedisSubscriberService,
  ],
  exports: ['REDIS_CLIENT', 'REDIS_SUB_CLIENT', RedisSubscriberService],
})
export class RedisModule {}
