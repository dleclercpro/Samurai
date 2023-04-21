import { IPlayer } from '../models/Player';
import { TILE_ID_MOVE, TILE_ID_SWAP } from '../constants';
import { Normal, Move, Swap, Play } from './Rules';

/* This class is responsible for executing the moves ordered by the players. */
class Valet {

    public async execute(player: IPlayer, play: Play) {
        const { handTile, boardTiles, castes } = play;

        switch (handTile.getId()) {
            case TILE_ID_MOVE:
                await this.executeMove(player, { boardTiles } as Move);
            case TILE_ID_SWAP:
                await this.executeSwap(player, { boardTiles, castes } as Swap);
            default:
                await this.executeNormal(player, { handTile, boardTile: boardTiles.to } as Normal);
        }
    }

    public async executeNormal(player: IPlayer, play: Normal) {

        // Remove tile from player's hand
    }

    public async executeMove(player: IPlayer, play: Move) {

    }

    public async executeSwap(player: IPlayer, play: Swap) {

    }
}

export default Valet;