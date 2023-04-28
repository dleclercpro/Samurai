import { RequestHandler } from 'express';

export const SignUpSanitization: RequestHandler = (req, res, next) => {
    const { email } = req.body;
    
    // Sanitize email
    req.body = {
        ...req.body,
        email: email.trim().toLowerCase(),
    };

    next();
}