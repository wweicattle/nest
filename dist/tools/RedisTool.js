"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Redis = void 0;
const ioredis_1 = require("ioredis");
const config_1 = require("../posts/config");
const NEWRedis = config_1.default.REDIS;
class Redis {
    constructor() {
        this.redisCache = new ioredis_1.default({
            port: NEWRedis.port,
            host: NEWRedis.host,
            password: NEWRedis.password,
            db: NEWRedis.db,
        });
    }
    async set({ key, value, ttl = 60 * 5, type = 'EX' }) {
        return await this.redisCache.set(key, value, type, ttl);
    }
    async get(key) {
        return await this.redisCache.get(key);
    }
    async del(key) {
        return await this.redisCache.del(key);
    }
}
exports.Redis = Redis;
//# sourceMappingURL=RedisTool.js.map