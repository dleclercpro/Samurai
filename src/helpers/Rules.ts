import { IPlayer } from '../models/Player';
import { Caste } from '../types/GameTypes';
import { IBoardTile } from '../models/BoardTile';
import { IHandTile } from '../models/HandTile';
import { FromTo } from '../types';
import { GameOrder } from '../commands/game/PlayGameCommand';
import { HAND_TILE_ID_MOVE, HAND_TILE_ID_SWAP } from '../constants';
import { IBoard } from '../models/Board';

export interface Normal {
    boardTile: IBoardTile,
    handTile: IHandTile,
}

export interface Move {
    boardTiles: FromTo<IBoardTile>,
}

export interface Swap {
    boardTiles: FromTo<IBoardTile>,
    castes: FromTo<Caste>,
    board: IBoard,
}



/*
   This class is responsible to check whether a given order is allowed for a
   specific player.
*/
class Rules {
    player: IPlayer;

    public constructor(player: IPlayer) {
        this.player = player;
    }

    public canExecute(order: GameOrder) {
        const { handTile, boardTiles, castes } = order;

        switch (handTile.getId()) {
            case HAND_TILE_ID_MOVE:
                this.canMove({ boardTiles } as Move);
                break;
            case HAND_TILE_ID_SWAP:
                this.canSwap({ boardTiles, castes } as Swap);
                break;
            default:
                this.canNormal({ handTile, boardTile: boardTiles.to } as Normal);
                break;
        }
    }

    private canNormal(order: Normal) {
        const { boardTile, handTile } = order;

        if (boardTile.isCity()) {
            throw new Error('This board location is a city.');
        }

        if (!boardTile.isFree()) {
            throw new Error('This board location is not free.');
        }

        if (!boardTile.isHandTileCompatible(handTile)) {
            throw new Error(`Board and hand tiles aren't compatible: ${boardTile.getType()} vs. ${handTile.getType()}`);
        }

        return true;
    }

    private canMove(order: Move) {
        const { boardTiles } = order;
        const previouslyPlayedTile = boardTiles.from.getPlayedTile();

        if (boardTiles.from.isFree()) {
            throw new Error('This board location has no tile on it yet.');
        }

        if (previouslyPlayedTile.getPlayer().getId() !== this.player.getId()) {
            throw new Error(`Cannot move another player's tile.`);
        }

        if (boardTiles.to.isCity()) {
            throw new Error('This board location is a city.');
        }

        if (!boardTiles.to.isFree()) {
            throw new Error('This board location is not free.');
        }

        if (boardTiles.to.isHandTileCompatible(previouslyPlayedTile.getHandTile())) {
            throw new Error(`Board and hand tiles aren't compatible: ${boardTiles.to.getType()} vs. ${previouslyPlayedTile.getHandTile().getType()}`);
        }

        return true;
    }

    private canSwap(order: Swap) {
        const { boardTiles, castes } = order;

        if (!boardTiles.from.isCity()) {
            throw new Error(`The starting tile is not a city.`);
        }

        if (!boardTiles.to.isCity()) {
            throw new Error(`The ending tile is not a city.`);
        }

        if (boardTiles.from.getId() === boardTiles.to.getId()) {
            throw new Error('Cannot swap caste pieces from/to the same tile.');
        }

        if (!boardTiles.from.hasCastePiece(castes.from)) {
            throw new Error(`The given caste piece is not present on the starting tile: ${castes.from}`);
        }

        if (!boardTiles.to.hasCastePiece(castes.to)) {
            throw new Error(`The given caste piece is not present on the ending tile: ${castes.to}`);
        }

        return true;
    }
}

export default Rules;