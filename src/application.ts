import awilix, { AwilixContainer } from 'awilix'
import { IRequestContext } from './interface/IRequestContext.js'
import { ActorEntity } from './entities/ActorEntry.js'

export class Application {
    container: awilix.AwilixContainer

    constructor(container: AwilixContainer) {
        this.container = container
    }

    createRequestContext(actor: ActorEntity): IRequestContext {
        const scope = this.container.createScope<IRequestContext>()
        scope.register('actor', awilix.asValue(actor))
        return scope.cradle
    }
}
