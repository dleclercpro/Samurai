import { RequestHandler } from 'express';
import { successResponse } from '../utils/calls';
import { logger } from '../utils/logging';

const HealthController: RequestHandler = async (req, res, next) => {
    try {

        // Success
        return res.json(successResponse());

    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.warn(err.message);
        }
        
        next(err);
    }
}

export default HealthController;