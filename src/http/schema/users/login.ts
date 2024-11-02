import { errorCodes } from '../errorCodes.js'

export const login = {
    description: 'login',
    tags: ['user'],
    body: {
        description: 'login',
        type: 'object',
        properties: {
            login: { type: 'string' },
            password: { type: 'string' },
        },
    },
    response: {
        201: {
            description: 'successful login',
            type: 'object',
            properties: {
                id: { type: 'string' },
                type: { type: 'string' },
            },
        },
        ...errorCodes,
    },
}
