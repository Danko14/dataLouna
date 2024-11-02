import { ActorEntity } from '../entities/ActorEntry.js'
import { IItemsService } from './services/IItems.js'
import { IUserService } from './services/IUser.js'

export interface IRequestContext {
    userService: IUserService
    itemsService: IItemsService
    actor: ActorEntity
}

export interface IRequestContextFactory {
    (actor: ActorEntity): IRequestContext
}

export interface IContextProvider {
    createRequestContext: IRequestContextFactory
}
