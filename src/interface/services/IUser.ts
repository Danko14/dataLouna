import { ActorEntity } from '../../entities/ActorEntry'

export interface IUserService {
  login(payload: { login: string, password: string }): Promise<{ cookie: string } & { actor: ActorEntity }>
  logout(cookie?: string): Promise<void>
  changePass(payload: { oldPassword: string, newPassword: string }): Promise<ActorEntity>
}
