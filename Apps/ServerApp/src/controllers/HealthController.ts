import { RequestHandler } from 'express';
import { successResponse } from '../utils/calls';

const HealthController: RequestHandler = async (req, res, next) => {
    try {

        // Success
        return res.json(successResponse());

    } catch (err: any) {
        next(err);
    }
}

export default HealthController;