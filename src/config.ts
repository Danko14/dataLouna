import { TConfig } from './types/config'

export const config: TConfig = {
    http: {
        host: process.env.HTTP_HOST ?? '0.0.0.0',
        port: Number(process.env.HTTP_PORT ?? 80),
    },

    pg: {
        host: process.env.PG_HOST ?? 'postgres',
        port: Number(process.env.PG_PORT) ?? 5432,
        user: process.env.PG_USERNAME ?? 'pony',
        password: process.env.PG_PASSWORD ?? '',
        database: process.env.PG_DATABASE ?? 'pony',
        pool: {
            min: Number(process.env.DB_POOL_MIN ?? 0),
            max: Number(process.env.DB_POOL_MAX ?? 2),
        },
    },

    sessionTTL: parseInt(process.env.SESSION_TTL ?? '864000', 10),
    redisConfig: {},
    nodeEnv: process.env.NODE_ENV ?? 'prod',
}

if (process.env.REDIS_PASSWORD) config.redisConfig.password = process.env.REDIS_PASSWORD
if (process.env.REDIS_DB) config.redisConfig.db = parseInt(process.env.REDIS_DB, 10)
if (process.env.REDIS_HOST) config.redisConfig.host = process.env.REDIS_HOST
if (process.env.REDIS_PORT) config.redisConfig.port = parseInt(process.env.REDIS_PORT, 10)
