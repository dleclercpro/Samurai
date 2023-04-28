import { RequestHandler } from 'express';

export const SignInSanitization: RequestHandler = (req, res, next) => {
    const { email } = req.body;
    
    // Sanitize email
    req.body = {
        ...req.body,
        email: email.trim().toLowerCase(),
    };

    next();
}