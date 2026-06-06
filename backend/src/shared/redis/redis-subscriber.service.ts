import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { EventEmitter } from 'events';

@Injectable()
export class RedisSubscriberService implements OnModuleDestroy {
  private emitter = new EventEmitter();
  private activeChannels = new Set<string>();

  constructor(@Inject('REDIS_SUB_CLIENT') private readonly redis: RedisClientType) {}

  async subscribe(channel: string, listener: (message: string) => void) {
    this.emitter.on(channel, listener);

    if (!this.activeChannels.has(channel)) {
      this.activeChannels.add(channel);
      await this.redis.subscribe(channel, (message: string) => {
        this.emitter.emit(channel, message);
      });
    }
  }

  async unsubscribe(channel: string, listener: (message: string) => void) {
    this.emitter.off(channel, listener);

    if (this.emitter.listenerCount(channel) === 0) {
      this.activeChannels.delete(channel);
      await this.redis.unsubscribe(channel);
    }
  }

  async onModuleDestroy() {
    this.emitter.removeAllListeners();
    this.activeChannels.clear();
  }
}
