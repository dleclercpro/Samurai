import { RequestHandler } from 'express';
import { successResponse } from '../../libs/calls';

const PingController: RequestHandler = async (req, res, next) => {
    try {

        // Success
        return res.json(successResponse());

    } catch (err: any) {
        next(err);
    }
}

export default PingController;