import { RequestHandler } from 'express';
import { ErrorGameDoesNotExist, ErrorGameVersionDoesNotExist } from '../../errors/GameErrors';
import { successResponse } from '../../libs/calls';
import Game from '../../models/game/Game';

const GetGameController: RequestHandler = async (req, res, next) => {
    try {
        const { gameId: id } = req.params;
        const { version } = req.body;

        return res.json(successResponse({}));

        /* // Fetch game
        const game = await Game.findById(id);
        
        if (!game) {
            throw new ErrorGameDoesNotExist(id);
        }

        // If version is higher than the current one, there's a problem
        if (version > game.getVersion()) {
            throw new ErrorGameVersionDoesNotExist(version);
        }
        
        // No need to send details back if client's game details
        // are already up-to-date
        if (version === game.getVersion()) {
            return res.json(successResponse());
        }

        // Otherwise send up-to-date details
        return res.json(successResponse({
            name: game.getName(),
            version: game.getVersion(),
            hand: [],
            board: [],
            lastPlayedTiles: [],
            players: {
                self: '',
                opponents: [],
            },
        })); */

    } catch (err: any) {
        next(err);
    }
}

export default GetGameController;