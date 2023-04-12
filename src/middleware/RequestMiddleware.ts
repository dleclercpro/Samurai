import { RequestHandler } from 'express';
import { logger } from '../utils/Logging';

export const RequestMiddleware: RequestHandler = (req, res, next) => {
    const { method, ip, originalUrl: url } = req;

    logger.trace(`[${method}] ${url} (${ip})`);

    next();
}