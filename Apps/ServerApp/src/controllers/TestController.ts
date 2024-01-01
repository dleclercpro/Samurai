import { RequestHandler } from 'express';
import { sleep } from '../utils/time';
import { TimeUnit } from '../types/TimeTypes';
import { successResponse } from '../utils/calls';
import TimeDuration from '../models/units/TimeDuration';
import { logger } from '../utils/logging';

const TestController: RequestHandler = async (req, res, next) => {
    try {

        // Fake some processing time
        await sleep(new TimeDuration(500 * Math.random(), TimeUnit.Millisecond));

        // Success
        return res.json(successResponse());

    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.warn(err.message);
        }
        
        next(err);
    }
}

export default TestController;