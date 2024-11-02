export type LoginRequest = {
  Body: {
    login: string
    password: string
  }
}
export type ChangePassRequest = {
  Body: {
    oldPassword: string
    newPassword: string
  }
}
