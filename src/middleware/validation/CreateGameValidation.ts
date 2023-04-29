import { RequestHandler } from 'express';
import { ErrorInvalidParams } from '../../errors/ServerError';

export const CreateGameValidation: RequestHandler = (req, res, next) => {
    const { name, opponentEmails } = req.body;

    const invalidParams = [];

    if (!name) {
        invalidParams.push('name');
    }

    if (!opponentEmails || opponentEmails.length === 0) {
        invalidParams.push('opponentEmails');
    }

    if (invalidParams.length > 0) {
        throw new ErrorInvalidParams(invalidParams);
    }
    
    next();
}