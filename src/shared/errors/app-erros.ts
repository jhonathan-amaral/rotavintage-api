export class AppError extends Error {
    public readonly statusCode: number;

    constructor (message: string, statusCode: number = 400 ){
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;

        Object.setPrototypeOf(this, AppError.prototype);
    }
}


export class ValidationError extends AppError{
    constructor(message: string ){
        super(message, 422);
        this.name = 'ValidationError';
    }
}

export class ConflictError extends AppError{
    constructor(message: string ){
        super(message, 409);
        this.name = 'ConflictError';
    }
}

export class NotFoundError extends AppError{
    constructor(message: string ){
        super(message, 404);
        this.name = 'NotFoundError';
    }
}