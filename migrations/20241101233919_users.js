/** @param  {import('knex').Knex} knex*/
const up = async knex => {

  await knex.schema.createTable('users',table =>{
    table.string("id").notNullable().primary();
	  table.string("login").notNullable().unique();
	  table.string("password_hash").notNullable()
	  table.string("salt").notNullable()
	  table.timestamps(true, true, false);
  })

}

/** @param  {import('knex').Knex} knex*/
const down = async knex => {
  await knex.schema.dropTableIfExists("users")
}

export { up, down }