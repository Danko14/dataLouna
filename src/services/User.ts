import { Session } from '@mgcrea/fastify-session'
import assert from 'assert'
import { IUsersRepo } from '../interface/repo/IUsers'
import { IUserService } from '../interface/services/IUser'
import { ActorEntity, ActorTypeEnum } from '../entities/ActorEntry.js'
import { Forbidden, InvalidRequestError } from '../errors/domain.js'
import { PasswordManager } from '../utils/PasswordManager.js'

export class UserService implements IUserService {
    private repo: IUsersRepo
    actor: ActorEntity

    constructor({ usersRepo, actor }: { usersRepo: IUsersRepo, actor: ActorEntity }) {
        this.repo = usersRepo
        this.actor = actor
    }

    async login({ login, password }: { login: string, password: string }) {
        const user = await this.repo.getByLogin({ login })
        assert(user, new Forbidden('Incorrect login or password'))

        const { id, passwordHash, salt } = user

        assert(
            PasswordManager.checkPass({ password, hash: passwordHash, salt }),
            new Forbidden('Incorrect login or password'),
        )

        const actor = new ActorEntity({ id, type: ActorTypeEnum.user })
        const session = new Session({ userId: id })
        await session.save()
        const cookie = await session.toCookie()

        return { cookie, actor }
    }

    async logout(cookie?: string): Promise<void> {
        assert(this.actor.isUser() && cookie, new Forbidden())

        await Session.fromCookie(cookie)
            .then(s => s.destroy())
            .catch(e => assert(e.code !== 'SessionNotFound', new InvalidRequestError('Already dead')))
    }

    async changePass({ oldPassword, newPassword }: { oldPassword: string, newPassword: string }): Promise<ActorEntity> {
        assert(this.actor.isUser(), new Forbidden())

        const user = await this.repo.getById({ id: this.actor.getId() })
        assert(user, new Forbidden('Incorrect login or password'))

        const { passwordHash, salt, id, login } = user

        assert(
            PasswordManager.checkPass({ password: oldPassword, hash: passwordHash, salt }),
            new Forbidden('Incorrect login or password'),
        )
        assert(oldPassword !== newPassword, new InvalidRequestError('Nothing changed'))

        await this.repo.updatePassword({ id, newHash: PasswordManager.encryptPassword({ password: newPassword, salt }) })

        return new ActorEntity({ id, type: ActorTypeEnum.user })
    }
}
