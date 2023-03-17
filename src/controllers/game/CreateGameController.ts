import { RequestHandler } from 'express';
import Connection from '../../models/Connection';
import { HttpStatusCode, HttpStatusMessage } from '../../types/HTTPTypes';
import { logger } from '../../utils/Logging';

const CreateGameController: RequestHandler = async (req, res) => {
    try {
        logger.debug(`Creating new game.`);

        // Success
        return res.json(Connection.success());

    } catch (err: any) {

        // Unknown error
        return res
            .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(HttpStatusMessage.INTERNAL_SERVER_ERROR);
    }
}

export default CreateGameController;