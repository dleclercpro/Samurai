import { ErrorRequestHandler } from 'express';
import { HttpStatusCode, HttpStatusMessage } from '../types/HTTPTypes';
import { logger } from '../utils/Logging';
import { ErrorInvalidParams } from '../errors/ServerError';

export const ErrorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    
    // Invalid parameters provided
    if (err.code === ErrorInvalidParams.code) {
        return res
            .status(HttpStatusCode.BAD_REQUEST)
            .send(HttpStatusMessage.BAD_REQUEST)
    }

    // Unknown error
    logger.error(`Unknown error: ${err.message}`);

    return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(HttpStatusMessage.INTERNAL_SERVER_ERROR);
}