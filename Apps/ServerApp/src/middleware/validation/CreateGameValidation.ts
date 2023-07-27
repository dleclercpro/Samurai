import { RequestHandler } from 'express';
import { ErrorInvalidParams } from '../../errors/ServerError';

export const CreateGameValidation: RequestHandler = (req, res, next) => {
    const { name, opponents } = req.body;

    const invalidParams = [];

    if (!name) {
        invalidParams.push('name');
    }

    if (!opponents) {
        invalidParams.push('opponents');
    }

    if (invalidParams.length > 0) {
        throw new ErrorInvalidParams(invalidParams);
    }
    
    next();
}