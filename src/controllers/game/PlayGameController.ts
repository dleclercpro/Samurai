import { RequestHandler } from 'express';
import { successResponse } from '../../libs/calls';
import { logger } from '../../utils/Logging';

const PlayGameController: RequestHandler = async (req, res, next) => {
    try {
        const { gameId } = req.params;

        logger.debug(`Playing game ${gameId}.`);

        // Success
        return res.json(successResponse());

    } catch (err: any) {
        next(err);
    }
}

export default PlayGameController;