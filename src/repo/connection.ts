import pkg, { PoolClient } from 'pg'
import { TConfig } from '../types/config'

const { Pool } = pkg

export const createDbConnection = async ({ config }: { config: TConfig }) => {
    const { pg } = config
    const { host, port, user, password, database } = pg
    const pool = new Pool({
        user,
        password,
        host,
        database,
        port,
    })
    pool.on('error', err => { throw err })
    const client: PoolClient = await pool.connect()

    return client
}
