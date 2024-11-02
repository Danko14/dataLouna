import { User, UserId } from '../../types/users'

export interface IUsersRepo {
  getByLogin(query: { login: string }): Promise<User | null>
  getById(query: { id: UserId }): Promise<User | null>
  updatePassword(query: { id: UserId, newHash: string }): Promise<void>
}
