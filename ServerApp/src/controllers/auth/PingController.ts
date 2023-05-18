import { RequestHandler } from 'express';
import { successResponse } from '../../libs/calls';
import { logger } from '../../utils/Logging';

const PingController: RequestHandler = async (req, res, next) => {
    try {
        const { session } = req;

        // Success
        return res.json(successResponse({
            username: session.getUsername(),
            email: session.getEmail(),
        }));

    } catch (err: any) {
        next(err);
    }
}

export default PingController;