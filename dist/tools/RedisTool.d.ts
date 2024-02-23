export declare class Redis {
    private redisCache;
    constructor();
    set({ key, value, ttl, type }: {
        key: any;
        value: any;
        ttl?: number;
        type?: string;
    }): Promise<any>;
    get(key: string): Promise<any>;
    del(key: string): Promise<any>;
}
