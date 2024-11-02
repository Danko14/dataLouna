export const itemSchema = {
    type: 'object',
    properties: {
        market_hash_name: { type: 'string' },
        currency: { type: 'string' },
        suggested_price: { type: 'number' },
        min_price: { type: 'number' },
        max_price: { type: 'number' },
    },
}
