import "dotenv/config"

const {
    PG_HOST: host,
    PG_PORT: port,
    POSTGRES_USERNAME: user,
    POSTGRES_PASSWORD: password,
    PG_DATABASE: database,
    DB_POOL_MAX: max,
    DB_POOL_MIN: min,
} = process.env;

const connection = {
    host,
    port,
    database,
    user,
    password,
}

/** @type {import("knex").Knex.Config}  */
export default {
    client: 'postgresql',
    connection,
    pool: {
        min: Number(min ?? 1),
        max: Number(max ?? 10),
    },
}
