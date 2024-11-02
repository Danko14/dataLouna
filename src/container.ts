import awilix from 'awilix'
import { config } from './config.js'
import { createDbConnection } from './repo/connection.js'
import { UsersRepo } from './repo/Users.js'
import { IUserService } from './interface/services/IUser.js'
import { UserService } from './services/User.js'
import { createRedisStore } from './cache/sessionStore.js'
import { createRedisClient } from './cache/redis.js'

const container = awilix.createContainer<{ userService: IUserService }>({ strict: true })

container.register('config', awilix.asValue(config))

container.register('pg', awilix.asValue(await createDbConnection({ config })))
container.register('redis', awilix.asFunction(createRedisClient).singleton())
container.register('sessionStore', awilix.asFunction(createRedisStore).singleton())

container.register('usersRepo', awilix.asClass(UsersRepo).singleton())

container.register('userService', awilix.asClass(UserService).scoped())

export { container }
