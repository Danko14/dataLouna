import { errorCodes } from '../errorCodes.js'

export const purchase = {
    description: 'purchase item',
    tags: ['items'],
    params: {
        type: 'object',
        properties: {
            hash: { type: 'string' },
        },
    },
    response: {
        200: {
            description: 'current balance',
            type: 'object',
            properties: {
                balance: { type: 'number' },
            },
        },
        ...errorCodes,
    },
}
