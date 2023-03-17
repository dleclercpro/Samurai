import { RequestHandler } from 'express';
import { HttpStatusCode, HttpStatusMessage } from '../types/HTTPTypes';
import { sleep } from '../libs/time';
import { TimeUnit } from '../types/TimeTypes';
import { logger } from '../utils/Logging';
import Connection from '../models/Connection';

const TestController: RequestHandler = async (req, res) => {
    try {

        // Fake some processing time
        await sleep(500 * Math.random(), TimeUnit.Millisecond);

        // Success
        return res.json(Connection.success());

    } catch (err: any) {
        logger.warn(err.message);

        // Unknown error
        return res
            .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(HttpStatusMessage.INTERNAL_SERVER_ERROR);
    }
}

export default TestController;