import { RequestHandler } from 'express';
import CreateGameCommand from '../../commands/game/CreateGameCommand';
import { errorResponse, successResponse } from '../../libs/calls';
import { ErrorInvalidParams } from '../../errors/ServerError';
import { ErrorUserDoesNotExist } from '../../errors/UserErrors';
import { HttpStatusCode } from '../../types/HTTPTypes';
import { ClientError } from '../../errors/ClientErrors';
import { logger } from '../../utils/Logging';

const CreateGameController: RequestHandler = async (req, res, next) => {
    try {
        const { user } = req;
        const { name, opponentEmails } = req.body;

        // Test params
        if (!name || !opponentEmails) {
            throw new ErrorInvalidParams();
        }

        // Create new game
        const game = await new CreateGameCommand({
            name,
            creatorEmail: user.getEmail(),
            opponentEmails,
        }).execute();

        // Success
        return res.json(successResponse({
            id: game.getId(),
        }));

    } catch (err: any) {
        logger.warn(err.message);

        if (err.code === ErrorUserDoesNotExist.code
        ) {
            return res
                .status(HttpStatusCode.BAD_REQUEST)
                .json(errorResponse(ClientError.UserDoesNotExist));
        }

        next(err);
    }
}

export default CreateGameController;