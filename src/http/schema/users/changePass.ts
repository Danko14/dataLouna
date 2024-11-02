import { errorCodes } from '../errorCodes.js'

export const changePass = {
    description: 'change password',
    tags: ['user'],
    body: {
        type: 'object',
        properties: {
            oldPassword: { type: 'string' },
            newPassword: { type: 'string' },
        },
    },
    response: {
        200: {
            description: 'changed!',
            type: 'object',
            properties: {
                id: { type: 'string' },
                type: { type: 'string' },
            },
        },
        ...errorCodes,
    },
}
