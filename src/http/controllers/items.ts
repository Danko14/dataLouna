import { FastifyInstance } from 'fastify'
import { IContextProvider } from '../../interface/IRequestContext'
import { schemas } from '../schema/items/index.js'
import * as DomainErrors from '../../errors/domain.js'
import * as HttpErrors from '../errors/HttpErrors.js'
import auth from '../midlewares/auth.js'
import { GetListRequest, PurchaseRequest } from '../../types/requests/items'

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
            if (error instanceof DomainErrors.IMaTeapot) return new HttpErrors.IMaTeapotError(message)
            return new HttpErrors.InternalServerError()
        })()

        reply.status(httpError.statusCode).send({ message: httpError.message })
    })

    fastify.get<GetListRequest>('/', { schema: schemas.getList }, async (req, res) => {
        const context = createRequestContext(req.actor)

        return context.itemsService.getList()
    })

    fastify.post<PurchaseRequest>('/purchase/:hash', { schema: schemas.purchase }, async req => {
        const context = createRequestContext(req.actor)

        return context.itemsService.purchase({ hash: decodeURI(req.params.hash) })
    })
}
