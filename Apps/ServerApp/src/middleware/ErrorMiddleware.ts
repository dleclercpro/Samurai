import { ErrorRequestHandler } from 'express';
import { HttpStatusCode, HttpStatusMessage } from '../types/HTTPTypes';
import { logger } from '../utils/logging';
import { ErrorInvalidParams } from '../errors/ServerError';
import { DEBUG } from '../config/AppConfig';
import { errorResponse } from '../utils/calls';

export const ErrorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    
    // Invalid parameters provided
    if (err.code === ErrorInvalidParams.code) {
        logger.warn(err.message);

        return res
            .status(HttpStatusCode.BAD_REQUEST)
            .json(errorResponse(HttpStatusMessage.BAD_REQUEST, err.getParams()))
    }

    // Unknown error
    if (DEBUG) {
        console.log(err);
    } else {
        logger.error(`Unknown error: ${err.message}`);
    }

    return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send(errorResponse(HttpStatusMessage.INTERNAL_SERVER_ERROR))
    }