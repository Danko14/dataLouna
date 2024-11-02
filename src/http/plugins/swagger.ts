import fastifySwagger from '@fastify/swagger'
import fp from 'fastify-plugin'

export default fp(async fastify => {
    fastify.register(fastifySwagger, {
        routePrefix: '/docs',
        swagger: {
            info: {
                title: 'dataLouna',
                description: 'dataLouna',
                version: '0.0.x',
            },
            host: process.env.SERVICE_API_URL,
            schemes: ['http', 'https'],
            consumes: ['application/json'],
            produces: ['application/json'],
        },
        exposeRoute: true,
    })
})
