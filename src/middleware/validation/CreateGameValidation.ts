import { RequestHandler } from 'express';
import { ErrorInvalidParams } from '../../errors/ServerError';
import { PLAYER_COUNT_MAX, PLAYER_COUNT_MIN } from '../../constants';

export const CreateGameValidation: RequestHandler = (req, res, next) => {
    const { name, opponentEmails } = req.body;

    const invalidParams = [];

    if (!name) {
        invalidParams.push('name');
    }

    const playerCount = opponentEmails.length + 1;
    if (!opponentEmails || playerCount < PLAYER_COUNT_MIN || playerCount > PLAYER_COUNT_MAX) {
        invalidParams.push('opponentEmails');
    }

    if (invalidParams.length > 0) {
        throw new ErrorInvalidParams(invalidParams);
    }
    
    next();
}