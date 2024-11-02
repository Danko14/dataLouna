import { Session } from '@mgcrea/fastify-session'
import { ActorEntity, ActorTypeEnum } from '../../entities/ActorEntry.js'

export default (session: Session): ActorEntity => {
    const user = session.data
    const { userId: id } = user

    return new ActorEntity({
        id: id ?? '00000000-0000-0000-0000-000000000000',
        type: id ? ActorTypeEnum.user : ActorTypeEnum.guest,
    })
}
