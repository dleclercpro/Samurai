import { RequestHandler } from 'express';
import { successResponse } from '../../libs/calls';
import { HttpStatusCode, HttpStatusMessage } from '../../types/HTTPTypes';
import { logger } from '../../utils/Logging';

const CreateGameController: RequestHandler = async (req, res) => {
    try {
        logger.debug(`Creating new game.`);

        // Success
        return res.json(successResponse());

    } catch (err: any) {

        // Unknown error
        return res
            .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(HttpStatusMessage.INTERNAL_SERVER_ERROR);
    }
}

export default CreateGameController;