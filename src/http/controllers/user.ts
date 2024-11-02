import { FastifyInstance } from 'fastify'
import { IContextProvider } from '../../interface/IRequestContext'
import { schemas } from '../schema/users/index.js'
import * as DomainErrors from '../../errors/domain.js'
import * as HttpErrors from '../errors/HttpErrors.js'
import auth from '../midlewares/auth.js'
import { ChangePassRequest, LoginRequest } from '../../types/requests/user'
import { ActorEntity, ActorTypeEnum } from '../../entities/ActorEntry'

export default async (fastify: FastifyInstance, options: IContextProvider) => {
    const { createRequestContext } = options

    fastify.addHook('preHandler', async req => {
        req.actor = auth(req.session)
    })

    fastify.setErrorHandler((error, request, reply) => {
        const httpError = (() => {
            const { message } = error
            console.error(error)
            if (error instanceof DomainErrors.Forbidden) return new HttpErrors.Forbidden(message)
            if (error instanceof DomainErrors.NotFound) return new HttpErrors.NotFound()
            if (error instanceof DomainErrors.ValidationError) return new HttpErrors.BadRequest(message)
            if (error instanceof DomainErrors.InvalidRequestError) return new HttpErrors.BadRequest(message)
            if (error instanceof DomainErrors.DuplicateData) return new HttpErrors.Conflict(message)
            return new HttpErrors.InternalServerError()
        })()

        reply.status(httpError.statusCode).send({ message: httpError.message })
    })

    fastify.post<LoginRequest>('/login', { schema: schemas.login }, async (req, res) => {
        const context = createRequestContext(new ActorEntity({
            id: '00000000-0000-0000-0000-000000000000',
            type: ActorTypeEnum.guest,
        }))

        const { actor, cookie } = await context.userService.login(req.body)

        res.code(201)
            .header('set-cookie', `Session=${cookie}; Path=/; HttpOnly; SameSite=Lax`)
            .send(actor)
    })

    fastify.delete<{}>('/logout', { schema: schemas.logout }, async req => {
        const context = createRequestContext(req.actor)
        await context.userService.logout(req.cookies['Session'])

        return { message: 'ok' }
    })

    fastify.patch<ChangePassRequest>('/change-pass', { schema: schemas.changePass }, async req => {
        const context = createRequestContext(req.actor)
        return context.userService.changePass(req.body)
    })
}
