export const errorCodes = {
    400: {
        type: 'object',
        description: 'Bad Request',
        properties: {
            message: { type: 'string' },
        },
        required: ['message'],
    },
    401: {
        type: 'object',
        description: 'Unauthorized',
        properties: {
            message: { type: 'string' },
        },
        required: ['message'],
    },
    403: {
        type: 'object',
        description: 'Forbidden',
        properties: {
            message: { type: 'string' },
        },
        required: ['message'],
    },
    404: {
        type: 'object',
        description: 'Not found',
        properties: {
            message: { type: 'string' },
        },
        required: ['message'],
    },
    418: {
        type: 'object',
        description: 'I\'m a teapot',
        properties: {
            message: { type: 'string' },
        },
        required: ['message'],
    },
    503: {
        type: 'object',
        description: 'Service unavailable',
        properties: {
            message: { type: 'string' },
        },
        required: ['message'],
    },
}
