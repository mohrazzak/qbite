import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ICacheObject, Field } from 'src/shared';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async set(key: string, value: string, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  async setObject(
    key: string,
    value: ICacheObject,
    ttl: number = 24 * 60 * 60 * 1000,
  ): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  async getValue(key: string): Promise<string | ICacheObject | undefined> {
    return this.cacheManager.get<string | ICacheObject>(key);
  }

  async deleteKey(key: string): Promise<void> {
    return this.cacheManager.del(key);
  }

  async getField(key: string, fieldName: Field): Promise<string | undefined> {
    const value = (await this.getValue(key)) as Record<string, any>;
    if (typeof value === 'object' && !!value) return value[fieldName];

    return undefined;
  }
}
