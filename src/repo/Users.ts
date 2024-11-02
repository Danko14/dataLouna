import pkg from 'pg'
import { IUsersRepo } from '../interface/repo/IUsers'
import { User, UserId } from '../types/users'
import { UserDbCols } from './dbcols.js'

class DataMapper {
    static mapRaw = (r: any): User => ({
        id: r[UserDbCols.id],
        login: r[UserDbCols.login],
        passwordHash: r[UserDbCols.passwordHash],
        salt: r[UserDbCols.salt],
        balance: r[UserDbCols.balance],
    })
}

const USERS_TABLE = 'users'

export class UsersRepo implements IUsersRepo {
    private db

    constructor({ pg }: { pg: pkg.Pool }) {
        this.db = pg
    }

    async getByLogin({ login }: { login: string }): Promise<User | null> {
        const query = `
          SELECT *
          FROM ${USERS_TABLE}
          WHERE ${UserDbCols.login} = '${login}'
        `

        const [record] = (await this.db.query(query)).rows

        return record ? DataMapper.mapRaw(record) : null
    }

    async updatePassword({ id, newHash }: { id: UserId, newHash :string }): Promise<void> {
        const query = `
          UPDATE ${USERS_TABLE}
            SET ${UserDbCols.passwordHash} = '${newHash}'
          WHERE ${UserDbCols.id} = '${id}'
        `

        await this.db.query(query)
    }

    async getById({ id }: { id: UserId }): Promise<User | null> {
        const query = `
          SELECT *
          FROM ${USERS_TABLE}
          WHERE ${UserDbCols.id} = '${id}'
        `

        const [record] = (await this.db.query(query)).rows

        return record ? DataMapper.mapRaw(record) : null
    }
}
