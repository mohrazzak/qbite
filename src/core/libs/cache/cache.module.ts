import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheModule as NestJSCacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { DynamicModule } from '@nestjs/common/interfaces';
import { Global } from '@nestjs/common/decorators';
import { redisOptions } from 'src/shared';

@Global()
@Module({})
export class CacheModule {
  static register(): DynamicModule {
    const providers = [CacheService];
    const imports = [
      NestJSCacheModule.registerAsync<RedisClientOptions>(redisOptions),
    ];

    return {
      providers,
      imports,
      exports: [CacheService],
      module: CacheModule,
    };
  }
}
