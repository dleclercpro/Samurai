import { IPlayer } from '../models/Player';
import { CASTES, HAND_TILE_ID_MOVE, HAND_TILE_ID_SWAP } from '../constants';
import { Normal, Move, Swap } from './Rules';
import PlayedTile from '../models/PlayedTile';
import { GameOrder } from '../commands/game/PlayGameCommand';
import { IGame } from '../models/Game';
import { IBoardTile } from '../models/BoardTile';
import Scorer from './Scorer';

/*
    This class is responsible for executing the moves ordered by the players
    (i.e. placing tiles on board).
*/
class Valet {
    player: IPlayer;

    public constructor(player: IPlayer) {
        this.player = player;
    }

    public execute(order: GameOrder) {
        const { handTile, boardTiles, castes } = order;

        switch (handTile.getId()) {
            case HAND_TILE_ID_MOVE:
                this.executeMove({ boardTiles } as Move);
                break;
            case HAND_TILE_ID_SWAP:
                this.executeSwap({ boardTiles, castes } as Swap);
                break;
            default:
                this.executeNormal({ handTile, boardTile: boardTiles.to } as Normal);
                break;
        }

        // Remove tile from player's hand
        this.player.getHand().removeTile(handTile);

        // Check if any city was closed with the last order (only swaps cannot lead to closing a city)
        if (handTile.getId() !== HAND_TILE_ID_SWAP) {
            const newClosedCities = boardTiles.to!.getNeighboringCities().filter(tile => tile.isClosed());

            // Distribute caste pieces on those cities
            newClosedCities.forEach(closedCity => this.distributeCastePieces(closedCity));
        }
    }

    private executeNormal(order: Normal) {
        const { handTile, boardTile } = order;

        // Set tile on board
        boardTile.setTile(new PlayedTile({
            playerId: this.player.getId(),
            handTile,
        }));
    }

    private executeMove(order: Move) {
        const { boardTiles } = order;

        // Set tile on new location
        boardTiles.to.setTile(new PlayedTile({
            playerId: this.player.getId(),
            handTile: boardTiles.from.getPlayedTile().getHandTile(),
        }));

        // Remove tile from old location
        boardTiles.from.removeTile();

        // Set 'move' tile on old location
        boardTiles.from.setTile(new PlayedTile({
            playerId: this.player.getId(),
            handTile: this.player.getHand().getTileById(HAND_TILE_ID_MOVE),
        }));
    }

    private executeSwap(order: Swap) {
        const { boardTiles, castes } = order;
        const game = this.player.ownerDocument() as IGame;
        const board = game.getBoard();

        // Delete caste pieces from old locations
        boardTiles.from.removeCastePiece(castes.from);
        boardTiles.to.removeCastePiece(castes.to);

        // Add caste pieces to new locations
        boardTiles.from.addCastePiece(castes.to);
        boardTiles.to.addCastePiece(castes.from);

        // Set 'swap' tile on dedicated location
        board.getNextFreeSwapTile().setTile(new PlayedTile({
            playerId: this.player.getId(),
            handTile: this.player.getHand().getTileById(HAND_TILE_ID_SWAP),
        }));
    }

    private distributeCastePieces(city: IBoardTile) {
        if (!city.isClosed()) {
            throw new Error('Cannot distribute caste pieces of city if the latter is not closed!');
        }

        // Update scores
        const scorer = new Scorer(city.ownerDocument() as IGame);
        scorer.updateScoresByCity(city);

        // Remove caste pieces from board
        CASTES.forEach(caste => {
            city.removeCastePiecesByCaste(caste);
        });
    }
}

export default Valet;