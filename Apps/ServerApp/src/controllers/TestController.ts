import { RequestHandler } from 'express';
import { sleep } from '../utils/time';
import { TimeUnit } from '../types/TimeTypes';
import { successResponse } from '../utils/calls';

const TestController: RequestHandler = async (req, res, next) => {
    try {

        // Fake some processing time
        await sleep({ time: 500 * Math.random(), unit: TimeUnit.Millisecond });

        // Success
        return res.json(successResponse());

    } catch (err: any) {
        next(err);
    }
}

export default TestController;