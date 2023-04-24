import { IGame } from '../../models/Game';
import Command from '../Command';
import { IPlayer } from '../../models/Player';
import { IBoardTile } from '../../models/BoardTile';
import { IHandTile } from '../../models/HandTile';
import Rules from '../../helpers/Rules';
import { Caste } from '../../types/GameTypes';
import { FromTo } from '../../types';
import Valet from '../../helpers/Valet';
import { TILE_ID_MOVE, TILE_ID_SWAP } from '../../constants';
import { ErrorInvalidGameOrder } from '../../errors/GameErrors';

export interface GameOrder {
    handTile: IHandTile,
    boardTiles: FromTo<IBoardTile | null>,
    castes: FromTo<Caste | null>,
}

interface Argument {
    game: IGame,
    player: IPlayer,
    order: GameOrder,
}

type Response = void;

class PlayGameCommand extends Command<Argument, Response> {

    public constructor(argument: Argument) {
        super('PlayGameCommand', argument);
    }

    protected async doPrepare() {
        this.validateGameOrder();
    }

    protected async doExecute() {
        const { game, player, order } = this.argument;

        // Check if player's move respects game rules
        new Rules().canPlay(player, order);

        // Execute player's move
        new Valet().execute(player, order);

        // Save game
        await game.save();
    }

    private validateGameOrder() {
        const { order } = this.argument;
        const { handTile, boardTiles, castes } = order;

        const someCaste = ![castes.from, castes.to].every(caste => caste === null);
    
        // Check input parameters for move
        if (handTile.getId() === TILE_ID_MOVE) {
            if ([boardTiles.from, boardTiles.to].includes(null) || someCaste) {
                throw new ErrorInvalidGameOrder('Move');
            }
        }
    
        // Check input parameters for swap
        if (handTile.getId() === TILE_ID_SWAP) {
            if ([boardTiles.from, boardTiles.to, castes.from, castes.to].includes(null)) {
                throw new ErrorInvalidGameOrder('Swap');
            }
        }
    
        // Check input parameters for normal play
        if (boardTiles.from !== null || boardTiles.to === null || someCaste) {
            throw new ErrorInvalidGameOrder('Normal');
        }
    }
}

export default PlayGameCommand;