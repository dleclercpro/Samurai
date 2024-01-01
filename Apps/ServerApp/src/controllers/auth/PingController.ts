import { RequestHandler } from 'express';
import { successResponse } from '../../utils/calls';
import { logger } from '../../utils/logging';

const PingController: RequestHandler = async (req, res, next) => {
    try {
        const { user } = req;

        // Success
        return res.json(successResponse({
            username: user.getUsername(),
            email: user.getEmail(),
            isAdmin: user.isAdmin,
        }));

    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.warn(err.message);
        }
        
        next(err);
    }
}

export default PingController;