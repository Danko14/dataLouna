import { UserId } from '../types/users'

export enum ActorTypeEnum {
    user = 'user',
    guest = 'guest'
}

export type ActorType = ActorTypeEnum

export class ActorEntity {
    private id: UserId
    private type: ActorType

    constructor({ id, type }: { id: UserId, type: ActorType }) {
        this.id = id
        this.type = type
    }

    isAuthenticated() {
        return this.id != null
    }

    getId() {
        return this.id
    }

    getType() {
        return this.type
    }

    isUser() {
        return this.type !== ActorTypeEnum.guest
    }
}
