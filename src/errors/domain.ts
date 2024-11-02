class DomainError extends Error {}

export class Forbidden extends DomainError {
    constructor(message: string = 'Forbidden') {
        super(message)
    }
}
export class NotFound extends DomainError {
    constructor(message: string = 'Not found') {
        super(message)
    }
}
export class ValidationError extends DomainError {
    constructor(message: string = 'Validation error') {
        super(message)
    }
}

export class InvalidRequestError extends DomainError {
    constructor(message: string = 'Invalid request') {
        super(message)
    }
}

export class InsufficientData extends DomainError {
    constructor(message: string = 'Insufficient data') {
        super(message)
    }
}

export class DuplicateData extends DomainError {
    constructor(message: string = 'Duplicate data') {
        super(message)
    }
}
