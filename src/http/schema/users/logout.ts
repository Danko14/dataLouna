import { errorCodes } from '../errorCodes.js'

export const logout = {
    description: 'logout',
    tags: ['user'],
    response: {
        200: {
            description: 'successful logout',
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
        ...errorCodes,
    },
}
