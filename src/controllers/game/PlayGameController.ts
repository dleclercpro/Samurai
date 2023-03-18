import { RequestHandler } from 'express';
import { successResponse } from '../../libs/calls';
import { HttpStatusCode, HttpStatusMessage } from '../../types/HTTPTypes';
import { logger } from '../../utils/Logging';

const PlayGameController: RequestHandler = async (req, res) => {
    try {
        const { gameId } = req.params;

        logger.debug(`Playing game ${gameId}.`);

        // Success
        return res.json(successResponse());

    } catch (err: any) {

        // Unknown error
        return res
            .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(HttpStatusMessage.INTERNAL_SERVER_ERROR);
    }
}

export default PlayGameController;