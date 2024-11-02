import { ActorEntity } from '../entities/ActorEntry.js'
import { IUserService } from './services/IUser.js'

export interface IRequestContext {
    userService: IUserService
    actor: ActorEntity
}

export interface IRequestContextFactory {
    (actor: ActorEntity): IRequestContext
}

export interface IContextProvider {
    createRequestContext: IRequestContextFactory
}
