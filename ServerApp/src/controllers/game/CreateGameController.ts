import { RequestHandler } from 'express';
import CreateGameCommand from '../../commands/game/CreateGameCommand';
import { errorResponse, successResponse } from '../../libs/calls';
import { ErrorUserDoesNotExist } from '../../errors/UserErrors';
import { HttpStatusCode, HttpStatusMessage } from '../../types/HTTPTypes';
import { ErrorGameDuplicateUsers } from '../../errors/GameErrors';

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
            err.code === ErrorGameDuplicateUsers.code
        ) {
            return res
                .status(HttpStatusCode.BAD_REQUEST)
                .json(errorResponse(HttpStatusMessage.BAD_REQUEST));
        }

        next(err);
    }
}

export default CreateGameController;