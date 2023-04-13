import { RequestHandler } from 'express';
import { successResponse } from '../../libs/calls';
import { logger } from '../../utils/Logging';

const PlayGameController: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;

        logger.debug(`Playing game ${id}.`);

        // Success
        return res.json(successResponse());

    } catch (err: any) {
        next(err);
    }
}

export default PlayGameController;