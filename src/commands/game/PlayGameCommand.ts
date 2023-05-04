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
import { ErrorGameInvalidOrder } from '../../errors/GameErrors';
import Scorer from '../../helpers/Scorer';

export enum GameOrderType {
    Normal = 'Normal',
    Move = 'Move',
    Swap = 'Swap',
}

export interface RawGameOrder {
    handTileId: number,
    boardTileIds: FromTo<number | null>,
    castes: FromTo<Caste | null>,
}

export interface GameOrder {
    handTile: IHandTile,
    boardTiles: FromTo<IBoardTile | null>,
    castes: FromTo<Caste | null>,
}

interface Argument {
    player: IPlayer,
    order: RawGameOrder,
}

type Response = void;

class PlayGameCommand extends Command<Argument, Response> {
    private game: IGame;
    private order?: GameOrder;

    public constructor(argument: Argument) {
        super('PlayGameCommand', argument);

        this.game = argument.player.ownerDocument() as IGame;
    }

    protected async doPrepare() {
        this.parseGameOrder();
        this.validateGameOrder();
    }

    protected async doExecute() {
        const { player } = this.argument;
        const game = this.game;

        // Get current time
        const now = new Date();

        // Check if player's order respects game rules
        new Rules(player).canExecute(this.order!);

        // Execute player's order
        new Valet(player).execute(this.order!);

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

    private parseGameOrder() {
        const { player, order } = this.argument;
        const { handTileId, boardTileIds, castes } = order;

        // Ensure player has hand tile in passed order 
        const handTile = player.getHand().getTileById(handTileId);

        // Ensure board tiles exist in current game
        const board = this.game.getBoard();
        const boardTiles = {
            from: boardTileIds.from ? board.getTileById(boardTileIds.from) : null,
            to: boardTileIds.to ? board.getTileById(boardTileIds.to) : null,
        };

        // Form game order
        this.order = { handTile, boardTiles, castes };
    }

    private validateGameOrder() {
        const { handTile, boardTiles, castes } = this.order!;

        const someCaste = ![castes.from, castes.to].every(caste => caste === null);
    
        // Check input parameters for move
        if (handTile.getId() === HAND_TILE_ID_MOVE) {
            if ([boardTiles.from, boardTiles.to].includes(null) || someCaste) {
                throw new ErrorGameInvalidOrder(GameOrderType.Move);
            }
            return;
        }
    
        // Check input parameters for swap
        if (handTile.getId() === HAND_TILE_ID_SWAP) {
            if ([boardTiles.from, boardTiles.to, castes.from, castes.to].includes(null)) {
                throw new ErrorGameInvalidOrder(GameOrderType.Swap);
            }
            return;
        }
    
        // Check input parameters for normal play
        if (boardTiles.from !== null || boardTiles.to === null || someCaste) {
            throw new ErrorGameInvalidOrder(GameOrderType.Normal);
        }
        return;
    }
}

export default PlayGameCommand;