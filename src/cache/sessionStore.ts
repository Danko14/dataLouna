import Redis from 'ioredis'
import RedisStore from '@mgcrea/fastify-session-redis-store'
import { TConfig } from '../types/config'

/* eslint-disable max-len */
export const createRedisStore = ({ config, redis }: { config: TConfig, redis: Redis }) => new RedisStore({ client: redis, prefix: 'sess:', ttl: config.sessionTTL })
