import { RequestHandler } from 'express';
import { ErrorInvalidParams } from '../../errors/ServerError';

export const SignUpValidation: RequestHandler = (req, res, next) => {
    const { email, password, username } = req.body;

    const invalidParams = [];

    // Validate email
    if (!email) {
        invalidParams.push('email');
    }

    if (!password) {
        invalidParams.push('password');
    }

    if (!username) {
        invalidParams.push('username');
    }

    if (invalidParams.length > 0) {
        throw new ErrorInvalidParams(invalidParams);
    }
    
    next();
}