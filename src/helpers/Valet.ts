import { IPlayer } from '../models/Player';
import { TILE_ID_MOVE, TILE_ID_SWAP } from '../constants';
import { Normal, Move, Swap, Play } from './Rules';
import { IBoard } from '../models/Board';
import PlayedTile from '../models/PlayedTile';

/* This class is responsible for executing the moves ordered by the players. */
class Valet {
    private board: IBoard;

    public constructor(board: IBoard) {
        this.board = board;
    }

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

        // Remove tile from player's hand
        player.getHand().removeTile(play.handTile);
    }

    public async executeNormal(player: IPlayer, play: Normal) {
        const { handTile, boardTile } = play;

        // Set tile on board
        boardTile.setTile(new PlayedTile({
            playerId: player.getId(),
            handTile,
        }));
    }

    public async executeMove(player: IPlayer, play: Move) {
        const { boardTiles } = play;
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

    public async executeSwap(player: IPlayer, play: Swap) {
        const { boardTiles } = play;
        const swapTile = player.getHand().getTileById(TILE_ID_SWAP);
    }
}

export default Valet;