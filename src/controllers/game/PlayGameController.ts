import { RequestHandler } from 'express';
import { errorResponse, successResponse } from '../../libs/calls';
import PlayGameCommand from '../../commands/game/PlayGameCommand';
import { ErrorGameAlreadyOver, ErrorInvalidGameOrder } from '../../errors/GameErrors';
import { logger } from '../../utils/Logging';
import { ClientError } from '../../errors/ClientErrors';
import { HttpStatusCode } from '../../types/HTTPTypes';
import Game from '../../models/Game';
import { FromTo } from '../../types';
import { Caste } from '../../types/GameTypes';

interface Body {
    handTileId: number,
    boardTileIds: FromTo<number | null>,
    castes: FromTo<Caste | null>,
}

const PlayGameController: RequestHandler = async (req, res, next) => {
    try {
        const { user } = req;
        const { id } = req.params;
        const { handTileId, boardTileIds, castes } = req.body as Body;

        // Get game and player
        const game = await Game.getById(id);

        // Check if game isn't already over
        if (game.hasWinners()) {
            throw new ErrorGameAlreadyOver(game);
        }

        // Ensure tile exists in player's hand (a hand tile should ALWAYS be provided!)
        const player = game.getPlayerByUser(user);
        const handTile = player.getHand().getTileById(handTileId);

        // Ensure provided (!) board tiles exist in current game
        const board = game.getBoard();
        const boardTiles = {
            from: boardTileIds.from ? board.getTileById(boardTileIds.from) : null,
            to: boardTileIds.to ? board.getTileById(boardTileIds.to) : null,
        };

        // Form game order
        const order = { handTile, boardTiles, castes };

        // Execute 
        await new PlayGameCommand({ player, order }).execute();

        // Success
        return res.json(successResponse());

    } catch (err: any) {
        if (err.code === ErrorInvalidGameOrder.code) {
            logger.warn(err.message);

            return res
                .status(HttpStatusCode.BAD_REQUEST)
                .json(errorResponse(ClientError.InvalidGameOrder));
        }

        next(err);
    }
}

export default PlayGameController;