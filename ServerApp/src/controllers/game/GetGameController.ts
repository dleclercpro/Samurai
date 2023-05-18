import { RequestHandler } from 'express';
import { errorResponse, successResponse } from '../../libs/calls';
import GetGameCommand from '../../commands/game/GetGameCommand';
import { HttpStatusCode } from '../../types/HTTPTypes';
import { ClientError } from '../../errors/ClientErrors';
import { logger } from '../../utils/Logging';
import { ErrorGameDoesNotExist, ErrorGameVersionDoesNotExist } from '../../errors/GameErrors';

const GetGameController: RequestHandler = async (req, res, next) => {
    try {
        const { id, version: _version } = req.params;

        // Parse version
        const version = parseInt(_version, 0);

        // Fetch game
        const game = await new GetGameCommand({ id, version }).execute();

        // No updates since provided version
        if (game === null) {
            return res.json(successResponse());
        }

        // Otherwise send up-to-date details
        return res.json(successResponse({
            name: game.getName(),
            version: game.getVersion(),
            board: game.getBoard(),
            players: game.getPlayers(),
            lastPlayedTiles: [],
        }));

    } catch (err: any) {
        if (err.code === ErrorGameDoesNotExist.code ||
            err.code === ErrorGameVersionDoesNotExist.code) {
            logger.warn(err.message);

            return res
                .status(HttpStatusCode.NOT_FOUND)
                .json(errorResponse(ClientError.GameDoesNotExist));
        }
        
        next(err);
    }
}

export default GetGameController;