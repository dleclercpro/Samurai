import { RequestHandler } from 'express';
import { logger } from '../utils/logging';

export const RequestMiddleware: RequestHandler = (req, res, next) => {
    const { method, ip, originalUrl: url } = req;

    // Log every single request
    logger.trace(`[${method}] ${url} (${ip})`);

    next();
}