import { errorCodes } from '../errorCodes.js'
import { itemSchema } from './item.js'

export const getList = {
    description: 'get items',
    tags: ['items'],
    response: {
        200: {
            description: 'items',
            type: 'object',
            properties: {
                items: {
                    type: 'array',
                    items: itemSchema,
                },
                total: { type: 'number' },
            },
        },
        ...errorCodes,
    },
}
