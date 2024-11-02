export declare type TRedisConfig = {
    password?: string,
    db?: number,
    host?: string,
    port?: number
}

export type TConfig = {
    http:{
        host: string,
        port: number,
    }
    sessionTTL: number,
    redisConfig: TRedisConfig,
    nodeEnv: string,
    pg: {
        host: string
        port: number
        user: string
        password: string
        database: string
        pool?: {
            max?: number
            min?: number
        },
    }
}
