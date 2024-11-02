/** @param  {import('knex').Knex} knex*/
const up = async knex => {

  await knex.schema.createTable('users', table => {
    table.string("id").notNullable().primary();
	  table.string("login").notNullable().unique();
	  table.string("password_hash").notNullable()
	  table.string("salt").notNullable()
	  table.float("balance").notNullable().defaultTo(0)
	  table.timestamps(true, true, false);

  })
  await knex.raw(`
    ALTER TABLE users
    ADD CONSTRAINT balance_positive CHECK (balance >= 0);
  `)

  await knex.table('users').insert({
    id: '45e29083-9040-4a76-ae28-65ff9aa67970', 
    login: 'user', 
    password_hash: 'dLe2YZyQRPjQNAtu6ocfZXtHysSB3vgOMbAoQ2uBpCFrUFKmwssnl3FBN3tmkiTxZa/oJ9MHRBRSGtq9UXlqXA==', 
    salt: 'RsTETX2YfmD08wElwLfwiQ==',
    balance: 1000
  })

}

/** @param  {import('knex').Knex} knex*/
const down = async knex => {
  await knex.schema.dropTableIfExists("users")
}

export { up, down }
