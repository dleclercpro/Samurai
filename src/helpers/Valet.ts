import { IPlayer } from '../models/Player';
import { TILE_ID_MOVE, TILE_ID_SWAP } from '../constants';
import { Normal, Move, Swap } from './Rules';
import PlayedTile from '../models/PlayedTile';
import { GameOrder } from '../commands/game/PlayGameCommand';

/* This class is responsible for executing the moves ordered by the players. */
class Valet {

    public execute(player: IPlayer, order: GameOrder) {
        const { handTile, boardTiles, castes } = order;

        switch (handTile.getId()) {
            case TILE_ID_MOVE:
                this.executeMove(player, { boardTiles } as Move);
                break;
            case TILE_ID_SWAP:
                this.executeSwap(player, { boardTiles, castes } as Swap);
                break;
            default:
                this.executeNormal(player, { handTile, boardTile: boardTiles.to } as Normal);
                break;
        }

        // Remove tile from player's hand
        player.getHand().removeTile(handTile);
    }

    private executeNormal(player: IPlayer, order: Normal) {
        const { handTile, boardTile } = order;

        // Set tile on board
        boardTile.setTile(new PlayedTile({
            playerId: player.getId(),
            handTile,
        }));
    }

    private executeMove(player: IPlayer, order: Move) {
        const { boardTiles } = order;
        const moveTile = player.getHand().getTileById(TILE_ID_MOVE);

        // Set tile on new location
        boardTiles.to.setTile(new PlayedTile({
            playerId: player.getId(),
            handTile: boardTiles.from.getPlayedTile().getHandTile(),
        }));

        // Remove tile from old location
        boardTiles.from.removeTile();

        // Set 'move' tile on old location
        boardTiles.from.setTile(new PlayedTile({
            playerId: player.getId(),
            handTile: moveTile,
        }));
    }

    private executeSwap(player: IPlayer, order: Swap) {
        const { boardTiles } = order;
        const swapTile = player.getHand().getTileById(TILE_ID_SWAP);
    }
}

export default Valet;