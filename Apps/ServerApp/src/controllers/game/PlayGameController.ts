import { RequestHandler } from 'express';
import { errorResponse, successResponse } from '../../utils/calls';
import PlayGameCommand from '../../commands/game/PlayGameCommand';
import { ErrorGameAlreadyOver, ErrorGameTileNotInHand, ErrorGameInvalidOrder, ErrorGameCastePieceDoesNotExist, ErrorGameIncompatibleTileTypes, ErrorGameCannotPlaceTileOntoCity, ErrorGameNotPlayerTurn, ErrorGameBoardTileDoesNotExist, ErrorGameCannotSwapCastePiecesFromToNonCityBoardTile, ErrorGameCannotSwapCastePiecesOnSameBoardTile, ErrorGameBoardTileNotFree, ErrorGameCannotMoveOtherPlayerTile, ErrorGamePlayedTileDoesNotExist, ErrorGameHandTileDoesNotExist, ErrorGameCanOnlyMoveFromGroundTiles } from '../../errors/GameErrors';
import { logger } from '../../utils/logging';
import { ClientError } from '../../errors/ClientErrors';
import { HttpStatusCode, HttpStatusMessage } from '../../types/HTTPTypes';
import Game from '../../models/Game';
import { GameOrder } from '../../models/Order';

export type PlayGameControllerBody = GameOrder;

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
        // Admin users can play for other players
        const player = user.isAdmin ? game.getCurrentPlayer() : game.getPlayerByUser(user);

        // Execute 
        await new PlayGameCommand({ player, order }).execute();

        // Success
        return res.json(successResponse());

    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.warn(err.message);
        }

        if ([ErrorGameInvalidOrder,
            ErrorGameTileNotInHand,
            ErrorGameCastePieceDoesNotExist,
            ErrorGameIncompatibleTileTypes,
            ErrorGameCanOnlyMoveFromGroundTiles,
            ErrorGameBoardTileNotFree,
            ErrorGameCannotPlaceTileOntoCity,
            ErrorGameCannotSwapCastePiecesFromToNonCityBoardTile,
            ErrorGameCannotSwapCastePiecesOnSameBoardTile,
            ErrorGameBoardTileDoesNotExist,
            ErrorGameHandTileDoesNotExist,
            ErrorGamePlayedTileDoesNotExist]
            .some(error => err instanceof error)
        ) {
            return res
                .status(HttpStatusCode.BAD_REQUEST)
                .json(errorResponse(ClientError.InvalidGameOrder));
        }

        if ([ErrorGameNotPlayerTurn, ErrorGameCannotMoveOtherPlayerTile]
            .some(error => err instanceof error)
        ) {
            return res
                .status(HttpStatusCode.FORBIDDEN)
                .json(errorResponse(HttpStatusMessage.FORBIDDEN));
        }

        next(err);
    }
}

export default PlayGameController;