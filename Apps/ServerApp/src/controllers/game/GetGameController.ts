import { RequestHandler } from 'express';
import { errorResponse, successResponse } from '../../utils/calls';
import GetGameCommand from '../../commands/game/GetGameCommand';
import { HttpStatusCode } from '../../types/HTTPTypes';
import { ClientError } from '../../errors/ClientErrors';
import { logger } from '../../utils/logging';
import { ErrorGameDoesNotExist, ErrorGameVersionDoesNotExist, ErrorUserNotPlayingInGame } from '../../errors/GameErrors';
import ClientDataAdapter from '../../helpers/data/ClientDataAdapter';

const GetGameController: RequestHandler = async (req, res, next) => {
    try {
        const { user } = req;
        const { id, version: _version } = req.params;

        // Parse version
        const version = Number(_version);

        // Fetch game
        const game = await new GetGameCommand({ id, version, user }).execute();

        // No updates since provided version
        if (game === null) {
            return res.json(successResponse());
        }

        // Otherwise send up-to-date details
        return res.json(successResponse(await ClientDataAdapter.getGameData(user, game)));

    } catch (err: any) {
        if (
            err.code === ErrorGameDoesNotExist.code ||
            err.code === ErrorGameVersionDoesNotExist.code ||
            err.code === ErrorUserNotPlayingInGame.code
        ) {
            logger.warn(err.message);

            return res
                .status(HttpStatusCode.NOT_FOUND)
                .json(errorResponse(ClientError.GameDoesNotExist));
        }
        
        next(err);
    }
}

export default GetGameController;