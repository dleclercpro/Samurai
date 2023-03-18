import { RequestHandler } from 'express';
import { successResponse } from '../../libs/calls';
import { logger } from '../../utils/Logging';

const GetGameController: RequestHandler = async (req, res, next) => {
    try {
        const { gameId } = req.params;

        logger.debug(`Fetching data for game ${gameId}.`);

        // Success
        return res.json(successResponse());

    } catch (err: any) {
        next(err);
    }
}

export default GetGameController;