export enum UserDbCols {
  id = 'id',
  login = 'login',
  passwordHash = 'password_hash',
  salt = 'salt',
  balance = 'balance',
}

export enum ITemsDbCols {
  market_hash_name = 'market_hash_name',
  currency = 'currency',
  suggested_price = 'suggested_price',
  item_page = 'item_page',
  market_page = 'market_page',
  min_price = 'min_price',
  max_price = 'max_price',
  mean_price = 'mean_price',
  median_price = 'median_price',
  quantity = 'quantity',
  created_at = 'created_at',
  updated_at = 'updated_at',
}

export enum UserItemsDbCols {
  userId = 'user_id',
  itemHash = 'item_hash',
}
