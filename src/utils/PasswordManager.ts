import * as crypto from 'crypto'

const hashIterations = 27500
const bitLength = 512
const byteLength = bitLength >> 3
const digest = 'sha256'

export class PasswordManager {
    static encryptPassword = ({ password, salt }: { password: string, salt: string }) => crypto
        .pbkdf2Sync(password, Buffer.from(salt, 'base64'), hashIterations, byteLength, digest)
        .toString('base64')

    // eslint-disable-next-line max-len
    static checkPass = ({ password, hash, salt }: { password: string, hash: string, salt: string }) => PasswordManager.encryptPassword({ password, salt }) === hash

    static saltGen = () => crypto.randomBytes(16).toString('base64')
}
