import { ErrorRequestHandler } from 'express';
import { HttpStatusCode, HttpStatusMessage } from '../types/HTTPTypes';
import { logger } from '../utils/logging';
import { ErrorInvalidParams } from '../errors/ServerError';
import { errorResponse } from '../utils/calls';

export const ErrorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof Error) {
        logger.warn(err.message);
    }

    // Invalid parameters provided
    if (err instanceof ErrorInvalidParams) {
        return res
            .status(HttpStatusCode.BAD_REQUEST)
            .json(errorResponse(HttpStatusMessage.BAD_REQUEST, err.getParams()))
    }

    // Unknown error
    if (err instanceof Error) {
        logger.error(`Unknown error: ${err.message}`);
    }

    return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(errorResponse(HttpStatusMessage.INTERNAL_SERVER_ERROR))
    }