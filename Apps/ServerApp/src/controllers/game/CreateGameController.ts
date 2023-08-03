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

    } catch (err: any) {
        if (
            err.code === ErrorUserDoesNotExist.code ||
            err.code === ErrorGameDuplicateUsers.code ||
            err.code === ErrorGameNotEnoughPlayers.code ||
            err.code === ErrorGameTooManyPlayers.code
        ) {
            logger.warn(err.message);

            return res
                .status(HttpStatusCode.BAD_REQUEST)
                .json(errorResponse(HttpStatusMessage.BAD_REQUEST));
        }

        next(err);
    }
}

export default CreateGameController;