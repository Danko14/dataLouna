import { PaginatedList } from '../../http/schema/common'
import { Item } from '../../types/items'
import { UserId } from '../../types/users'

export interface IItemsRepo {
  getList(): Promise<PaginatedList<Item>>
  recordPurchase(query: { userId: UserId, itemHash: Item['market_hash_name'], price: number }): Promise<{ balance: number }>
  getOne(query: { hash: Item['market_hash_name'] }): Promise<Item | null>
}
