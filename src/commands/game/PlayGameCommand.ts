import { IGame } from '../../models/Game';
import Command from '../Command';
import { IPlayer } from '../../models/Player';
import { IBoardTile } from '../../models/BoardTile';
import { IHandTile } from '../../models/HandTile';
import Rules from '../../helpers/Rules';
import { Caste } from '../../types/GameTypes';
import { FromTo } from '../../types';
import Valet from '../../helpers/Valet';
import { GAME_INIT_VERSION, HAND_TILE_ID_MOVE, HAND_TILE_ID_SWAP } from '../../constants';
import { ErrorInvalidGameOrder } from '../../errors/GameErrors';
import Scorer from '../../helpers/Scorer';

export enum GameOrderType {
    Normal = 'Normal',
    Move = 'Move',
    Swap = 'Swap',
}

export interface GameOrder {
    handTile: IHandTile,
    boardTiles: FromTo<IBoardTile | null>,
    castes: FromTo<Caste | null>,
}

interface Argument {
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
        const { player, order } = this.argument;

        // Get current time
        const now = new Date();

        // Get game
        const game = player.ownerDocument() as IGame;

        // Check if player's order respects game rules
        new Rules(player).canExecute(order);

        // Execute player's order
        new Valet(player).execute(order);

        // First order in game
        if (game.getVersion() === GAME_INIT_VERSION) {
            game.setStartTime(now);
        }

        // Increase game version
        game.setVersion(game.getVersion() + 1);

        // Game over
        if (game.getBoard().areAllCitiesClosed()) {
            game.setWinners(new Scorer(game).computeWinners());
            game.setEndTime(now);
        }

        // Update last played time
        game.setLastPlayedTime(now);

        // Save game
        await game.save();
    }

    private validateGameOrder() {
        const { order } = this.argument;
        const { handTile, boardTiles, castes } = order;

        const someCaste = ![castes.from, castes.to].every(caste => caste === null);
    
        // Check input parameters for move
        if (handTile.getId() === HAND_TILE_ID_MOVE) {
            if ([boardTiles.from, boardTiles.to].includes(null) || someCaste) {
                throw new ErrorInvalidGameOrder(GameOrderType.Move);
            }
            return;
        }
    
        // Check input parameters for swap
        if (handTile.getId() === HAND_TILE_ID_SWAP) {
            if ([boardTiles.from, boardTiles.to, castes.from, castes.to].includes(null)) {
                throw new ErrorInvalidGameOrder(GameOrderType.Swap);
            }
            return;
        }
    
        // Check input parameters for normal play
        if (boardTiles.from !== null || boardTiles.to === null || someCaste) {
            throw new ErrorInvalidGameOrder(GameOrderType.Normal);
        }
        return;
    }
}

export default PlayGameCommand;