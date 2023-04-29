import { RequestHandler } from 'express';

export const CreateGameSanitization: RequestHandler = (req, res, next) => {
    const { opponentEmails } = req.body;
    
    // Sanitize body types
    req.body = {
        ...req.body,
        opponentEmails: opponentEmails.map((email: string) => email.trim().toLowerCase()),
    };

    next();
}