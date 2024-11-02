import Redis from 'ioredis'
import { TConfig } from '../types/config'

export const createRedisClient = ({ config }: { config: TConfig }) => new Redis(config.redisConfig)
