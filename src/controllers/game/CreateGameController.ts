import { RequestHandler } from 'express';
import { successResponse } from '../../libs/calls';
import { logger } from '../../utils/Logging';

const CreateGameController: RequestHandler = async (req, res, next) => {
    try {
        logger.debug(`Creating new game.`);

        // Success
        return res.json(successResponse());

    } catch (err: any) {
        next(err);
    }
}

export default CreateGameController;