/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import { mockData } from '../src/assets/mock.js'

const up = async (knex) => {
  await knex.schema.createTable('items', table => {
    table.string("market_hash_name").notNullable().primary();
    table.string("currency").notNullable();
    table.float("suggested_price")
    table.string("item_page")
    table.string("market_page")
    table.float("min_price")
    table.float("max_price")
    table.float("mean_price")
    table.float("median_price")
    table.integer("quantity")
    table.timestamps(true, true, false);
  });

  await knex.schema.createTable('user_items', table => {
    table.string("user_id").notNullable();
    table.string("item_hash").notNullable();
    table.foreign("user_id")
      .references("id").inTable("users")
      .onDelete("CASCADE")
    table.foreign("item_hash")
      .references("market_hash_name").inTable("items")
      .onDelete("CASCADE")
  });

  await knex.table('items').insert(mockData.map(x => ({...x, created_at: new Date(x.created_at), updated_at: new Date(x.updated_at)})))
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = async knex => {
  await knex.schema.dropTableIfExists("user_items")
  await knex.schema.dropTableIfExists("items")
}

export { up, down }