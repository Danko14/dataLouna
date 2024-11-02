import { fastify, FastifyInstance } from 'fastify'
import { Session } from '@mgcrea/fastify-session'
import { AwilixContainer } from 'awilix'
import { Application } from './application.js'
import { ActorEntity } from './entities/ActorEntry.js'
import swagger from './http/plugins/swagger.js'
import { IContextProvider } from './interface/IRequestContext.js'
import user from './http/controllers/user.js'
import { config } from './config.js'
import { TConfig } from './types/config.js'
import session from './http/plugins/session.js'

export class HttpApplication extends Application {
    server: FastifyInstance
    config: {
        host: string
        port: number
    }

    constructor(container: AwilixContainer, config: { host: string, port: number }) {
        super(container)
        this.config = config

        this.server = fastify({
            ignoreTrailingSlash: true,
            ignoreDuplicateSlashes: true,
            logger: true,
        })
    }

    private getControllerOptions(prefix: string): IContextProvider & { prefix: string } {
        return {
            prefix,
            createRequestContext: (actor: ActorEntity) => this.createRequestContext(actor),
        }
    }

    async init() {
        const { sessionTTL, redisConfig, nodeEnv }: TConfig = config

        await this.server.register(session, { sessionTTL, redisConfig })
        if (nodeEnv === 'dev') await this.server.register(swagger)
        await this.server.register(user, this.getControllerOptions('/user'))
    }

    async start() {
        const address = await this.server.listen({
            port: this.config.port,
            host: this.config.host,
        })
        this.server.log.info(`HTTP Server listening at ${address}`)
    }

    async stop() {
        this.server.log.info('Stopping HTTP server...')
        await this.server.close()
        this.server.log.info('HTTP Server stopped')
    }
}

declare module 'fastify' {
    interface FastifyInstance {
    }

    interface FastifyRequest {
        actor: ActorEntity
        session: Session
    }
}
