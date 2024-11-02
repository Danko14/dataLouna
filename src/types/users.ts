export type UserId = string

export type User = {
  id: UserId
  login: string
  passwordHash: string
  salt: string
  balance: number
}
