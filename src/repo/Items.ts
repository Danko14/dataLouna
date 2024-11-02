import pkg from 'pg'
import { IItemsRepo } from '../interface/repo/IItems'
import { User, UserId } from '../types/users'
import { ITemsDbCols, UserDbCols, UserItemsDbCols } from './dbcols.js'
import { Item } from '../types/items'
import { PaginatedList } from '../http/schema/common'

class DataMapper {
    static mapRaw = (r: any): User => ({
        id: r[UserDbCols.id],
        login: r[UserDbCols.login],
        passwordHash: r[UserDbCols.passwordHash],
        salt: r[UserDbCols.salt],
        balance: r[UserDbCols.balance],
    })
}

const ITEMS_TABLE = 'items'
const USER_ITEMS_TABLE = 'user_items'
const USERS_TABLE = 'users'

export class ItemsRepo implements IItemsRepo {
    private db

    constructor({ pg }: { pg: pkg.Pool }) {
        this.db = pg
    }

    async getList(): Promise<PaginatedList<Item>> {
        const query = `
          SELECT *
          FROM ${ITEMS_TABLE}
        `
        const resp = await this.db.query(query)

        return { items: resp.rows, total: resp.rowCount ?? 0 }
    }

    async getOne({ hash }: { hash: Item['market_hash_name'] }): Promise<Item | null> {
        const query = `
          SELECT *
          FROM ${ITEMS_TABLE}
          WHERE ${ITemsDbCols.market_hash_name} = '${hash}'
        `

        const [record] = (await this.db.query(query)).rows

        return record
    }

    async recordPurchase({ userId, itemHash, price }: { userId: UserId; itemHash: Item['market_hash_name'], price: number })
      : Promise<{ balance: number }> {
        const balanceQuery = `
          UPDATE ${USERS_TABLE}
            SET ${UserDbCols.balance} = ${UserDbCols.balance} - ${price}
          WHERE ${UserDbCols.id} = '${userId}'
          RETURNING ${UserDbCols.balance};
        `
        const userItemQuery = `
          INSERT INTO ${USER_ITEMS_TABLE} (${UserItemsDbCols.userId}, ${UserItemsDbCols.itemHash})
            VALUES ('${userId}', '${itemHash}')
        `
        const quantityQuery = `
          UPDATE ${ITEMS_TABLE}
            SET ${ITemsDbCols.quantity} = ${ITemsDbCols.quantity} - 1
        `

        await this.db.query('BEGIN')
        const { balance } = (await this.db.query(balanceQuery)).rows[0]
        await this.db.query(userItemQuery)
        await this.db.query(quantityQuery)
        await this.db.query('END')

        return { balance }
    }
}
