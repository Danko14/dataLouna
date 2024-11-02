import assert from 'assert'
import Redis from 'ioredis'
import { IItemsRepo } from '../interface/repo/IItems'
import { ActorEntity } from '../entities/ActorEntry.js'
import { Forbidden, IMaTeapot, InvalidRequestError } from '../errors/domain.js'
import { IItemsService } from '../interface/services/IItems'
import { PaginatedList } from '../http/schema/common'
import { Item } from '../types/items'
import { IUsersRepo } from '../interface/repo/IUsers'

export class ItemsService implements IItemsService {
    private itemsRepo: IItemsRepo
    private usersRepo: IUsersRepo
    private redis: Redis
    actor: ActorEntity

    constructor({
        itemsRepo,
        usersRepo,
        actor,
        redis,
    }: {
        itemsRepo: IItemsRepo,
        usersRepo: IUsersRepo,
        actor: ActorEntity
        redis: Redis
    }) {
        this.itemsRepo = itemsRepo
        this.usersRepo = usersRepo
        this.actor = actor
        this.redis = redis
    }

    async getList(): Promise<PaginatedList<Item>> {
        assert(this.actor.isUser(), new Forbidden())

        let data
        /* here can be implemented some additional rules, filters & queries */
        const cacheResults = await this.redis.get('items')
        if (cacheResults) {
            data = JSON.parse(cacheResults)
        } else {
            data = await this.itemsRepo.getList()
            if (data?.total) {
                await this.redis.set('items', JSON.stringify(data))
            }
        }

        return this.itemsRepo.getList()
    }

    async purchase({ hash }: { hash: Item['market_hash_name'] }): Promise<{ balance: number }> {
        assert(this.actor.isUser(), new Forbidden())

        const user = await this.usersRepo.getById({ id: this.actor.getId() })
        const item = await this.itemsRepo.getOne({ hash })
        assert(user, new IMaTeapot('ССЗБ'))
        assert(item?.quantity != null && item?.quantity > 0, new InvalidRequestError('Out of stock'))
        assert(item.min_price != null && user.balance > item.min_price, new InvalidRequestError('Too broke'))

        return this.itemsRepo.recordPurchase({ userId: this.actor.getId(), itemHash: hash, price: item.min_price })
    }
}
