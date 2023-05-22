import { IGame } from '../../models/Game';
import Command from '../Command';
import { IPlayer } from '../../models/Player';
import Rules from '../../helpers/Rules';
import Valet from '../../helpers/Valet';
import { GAME_INIT_VERSION, HAND_TILE_ID_MOVE, HAND_TILE_ID_SWAP } from '../../constants';
import { ErrorGameInvalidOrder, ErrorGameNotPlayerTurn } from '../../errors/GameErrors';
import Scorer from '../../helpers/Scorer';
import { OrderType, GameOrder, RawGameOrder } from '../../models/Order';

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
        const { player } = this.argument;

        // Ensure given player is current player in game
        if (!player.isPlaying) {
            throw new ErrorGameNotPlayerTurn(player);
        }

        // Prepare game order
        this.parseGameOrder();
        this.validateGameOrder(this.order!);

        // Check if player's order respects game rules
        new Rules(player).canExecute(this.order!);
    }

    protected async doExecute() {
        const { game } = this;
        const { player, order } = this.argument;

        // Get current time
        const now = new Date();

        // First order in game
        if (game.getVersion() === GAME_INIT_VERSION) {
            game.setStartTime(now);
        }

        // Execute player's order on board with help of valet
        new Valet(player).execute(this.order!);

        // Store last order
        game.getHistory().pushOrder(order);

        // Update last played time
        game.setLastPlayedTime(now);

        // Update number of turns played by player
        player.incrementPlayedTurnCount();

        // Set last turn played by player
        player.setLastTurn(game.getVersion());

        // Game over
        if (game.getBoard().areAllCitiesClosed()) {
            game.setWinners(new Scorer(game).computeWinners());
            game.setEndTime(now);
        }

        // Otherwise
        else {

            // Move to next player
            game.setNextPlayer(game.getNextPlayer());

            // Increase game version
            game.setVersion(game.getVersion() + 1);
        }

        // Save game
        await game.save();
    }

    private parseGameOrder() {
        const { game } = this;
        const { player, order } = this.argument;
        const { handTileId, boardTileIds, castes } = order;

        // Ensure player has hand tile in passed order 
        const handTile = player.getHand().getTileById(handTileId);

        // Ensure board tiles exist in current game
        const board = game.getBoard();
        const boardTiles = {
            from: boardTileIds.from !== null ? board.getTileById(boardTileIds.from) : null,
            to: boardTileIds.to !== null ? board.getTileById(boardTileIds.to) : null,
        };

        // Form game order
        this.order = { handTile, boardTiles, castes };
    }

    private validateGameOrder(order: GameOrder) {
        const { handTile, boardTiles, castes } = order;

        const someCaste = ![castes.from, castes.to].every(caste => caste === null);
    
        // Check input parameters for move
        if (handTile.getId() === HAND_TILE_ID_MOVE) {
            if ([boardTiles.from, boardTiles.to].includes(null) || someCaste) {
                throw new ErrorGameInvalidOrder(OrderType.Move);
            }
            return;
        }
    
        // Check input parameters for swap
        if (handTile.getId() === HAND_TILE_ID_SWAP) {
            if ([boardTiles.from, boardTiles.to, castes.from, castes.to].includes(null)) {
                throw new ErrorGameInvalidOrder(OrderType.Swap);
            }
            return;
        }
    
        // Check input parameters for normal play
        if (boardTiles.from !== null || boardTiles.to === null || someCaste) {
            throw new ErrorGameInvalidOrder(OrderType.Normal);
        }
        return;
    }
}

export default PlayGameCommand;