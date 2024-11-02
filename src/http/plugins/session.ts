import fp from 'fastify-plugin'
import fastifyCookie from '@fastify/cookie'
import fastifySession, { Session } from '@mgcrea/fastify-session'
import { RedisStore } from '@mgcrea/fastify-session-redis-store'
import Redis from 'ioredis'
import { FastifyPluginOptions } from 'fastify'

export default fp<FastifyPluginOptions>(async (fastify, { sessionTTL, redisConfig }) => {
    fastify.register(fastifyCookie)
    fastify.register(fastifySession, {
        store: new RedisStore({ client: new Redis(redisConfig), prefix: 'sess:', ttl: sessionTTL }),
        secret: 'gloss-genetics-sandbar',
        cookie: {
            maxAge: sessionTTL,
            httpOnly: true,
            sameSite: 'strict',
            secure: false,
        },
        saveUninitialized: false,
    })
})

declare module 'fastify' {
    interface FastifyRequest {
        session: Session
    }
}

declare module '@mgcrea/fastify-session' {
    interface SessionData {
        userId: string
    }
}
