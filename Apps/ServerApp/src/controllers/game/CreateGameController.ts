import { RequestHandler } from 'express';
import CreateGameCommand from '../../commands/game/CreateGameCommand';
import { errorResponse, successResponse } from '../../utils/calls';
import { ErrorUserDoesNotExist } from '../../errors/UserErrors';
import { HttpStatusCode, HttpStatusMessage } from '../../types/HTTPTypes';
import { ErrorGameDuplicateUsers, ErrorGameNotEnoughPlayers, ErrorGameTooManyPlayers } from '../../errors/GameErrors';
import { logger } from '../../utils/logging';

export interface CreateGameControllerBody {
    name: string,
    opponents: string[],
}

type ICreateGameController = RequestHandler<any, any, CreateGameControllerBody>;

const CreateGameController: ICreateGameController = async (req, res, next) => {
    try {
        const { user } = req;
        const { name, opponents } = req.body;

        // Create new game
        const game = await new CreateGameCommand({
            name,
            creatorEmail: user.getEmail(),
            opponentEmails: opponents,
        }).execute();

        // Success
        return res.json(successResponse({
            id: game.getId(),
        }));

    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.warn(err.message);
        }

        if ([ErrorUserDoesNotExist, ErrorGameDuplicateUsers, ErrorGameNotEnoughPlayers, ErrorGameTooManyPlayers]
            .some(error => err instanceof error)
        ) {
            return res
                .status(HttpStatusCode.BAD_REQUEST)
                .json(errorResponse(HttpStatusMessage.BAD_REQUEST));
        }

        next(err);
    }
}

export default CreateGameController;