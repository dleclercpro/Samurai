import { RequestHandler } from 'express';

export const SignUpSanitization: RequestHandler = (req, res, next) => {
    const { email, username } = req.body;
    
    // Sanitize email and username
    req.body = {
        ...req.body,
        email: email.trim().toLowerCase(),
        username: username.trim(),
    };

    next();
}