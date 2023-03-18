import { ErrorRequestHandler, RequestHandler } from 'express';
import { HttpStatusCode, HttpStatusMessage } from '../types/HTTPTypes';
import { logger } from '../utils/Logging';

export const ErrorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    logger.error('Unknown error.');

    // Unknown error
    return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(HttpStatusMessage.INTERNAL_SERVER_ERROR);
}