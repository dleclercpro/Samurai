import { RequestHandler } from 'express';
import { errorResponse, successResponse } from '../../libs/calls';
import PlayGameCommand, { RawGameOrder } from '../../commands/game/PlayGameCommand';
import { ErrorGameAlreadyOver, ErrorGameTileNotInHand, ErrorGameInvalidOrder } from '../../errors/GameErrors';
import { logger } from '../../utils/Logging';
import { ClientError } from '../../errors/ClientErrors';
import { HttpStatusCode } from '../../types/HTTPTypes';
import Game from '../../models/Game';

export type PlayGameControllerBody = RawGameOrder;

type IPlayGameController = RequestHandler<any, any, PlayGameControllerBody>;

const PlayGameController: IPlayGameController = async (req, res, next) => {
    try {
        const { user } = req;
        const { id } = req.params;
        const order = req.body;

        // Get game and player
        const game = await Game.getById(id);

        // Check if game isn't already over
        if (game.hasWinners()) {
            throw new ErrorGameAlreadyOver(game);
        }

        // Ensure tile exists in player's hand (a hand tile should ALWAYS be provided!)
        const player = game.getPlayerByUser(user);

        // Execute 
        await new PlayGameCommand({ player, order }).execute();

        // Success
        return res.json(successResponse());

    } catch (err: any) {
        if (
            err.code === ErrorGameInvalidOrder.code ||
            err.code === ErrorGameTileNotInHand.code
        ) {
            logger.warn(err.message);

            return res
                .status(HttpStatusCode.BAD_REQUEST)
                .json(errorResponse(ClientError.InvalidGameOrder));
        }

        next(err);
    }
}

export default PlayGameController;