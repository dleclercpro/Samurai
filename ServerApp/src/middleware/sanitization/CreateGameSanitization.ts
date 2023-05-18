import { RequestHandler } from 'express';

export const CreateGameSanitization: RequestHandler = (req, res, next) => {
    const { opponents } = req.body;
    
    // Sanitize body types
    req.body = {
        ...req.body,
        opponents: opponents.map((email: string) => email.trim().toLowerCase()),
    };

    next();
}