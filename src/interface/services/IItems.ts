import { PaginatedList } from '../../http/schema/common'
import { Item } from '../../types/items'

export interface IItemsService {
  getList(): Promise<PaginatedList<Item>>
  purchase({ hash }: { hash: Item['market_hash_name'] }): Promise<{ balance: number }>
}
