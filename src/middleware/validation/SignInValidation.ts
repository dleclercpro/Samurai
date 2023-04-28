import { RequestHandler } from 'express';
import { ErrorInvalidParams } from '../../errors/ServerError';

export const SignInValidation: RequestHandler = (req, res, next) => {
    const {email, password, staySignedIn } = req.body;

    const invalidParams = [];

    // Validate email
    if (!email) {
        invalidParams.push('email');
    }

    if (!password) {
        invalidParams.push('password');    }

    if (typeof staySignedIn !== 'boolean') {
        invalidParams.push('staySignedIn');
    }

    if (invalidParams.length > 0) {
        throw new ErrorInvalidParams(invalidParams);
    }
    
    next();
}