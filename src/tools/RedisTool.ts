import Ioredis from 'ioredis';
import REDIS from '../posts/config';
const NEWRedis = REDIS.REDIS;

export class Redis {
  private redisCache;
  constructor() {
    this.redisCache = new Ioredis({
      port: NEWRedis.port,
      host: NEWRedis.host,
      password: NEWRedis.password,
      db: NEWRedis.db,
    });
  }
  async set({ key, value, ttl = 60 * 5, type = 'EX' }) {
    return await this.redisCache.set(key, value, type, ttl);
  }
  async get(key: string) {
    return await this.redisCache.get(key);
  }
  async del(key: string) {
    return await this.redisCache.del(key);
  }
}
