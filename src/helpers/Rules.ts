import { IPlayer } from '../models/Player';
import { Caste } from '../types/GameTypes';
import Board from './Board';
import { BoardTileType } from './BoardTile';

interface Play {
    handTileId: number,
    boardTileId: number,
}

interface Move {
    boardTileIds: {
        from: number,
        to: number,
    },
}

interface Swap {
    boardTileIds: {
        from: number,
        to: number,
    },
    castes: {
        from: Caste,
        to: Caste,
    },
}



class Rules {
    private board: Board;

    public constructor(board: Board) {
        this.board = board;
    }

    public async canPlay(player: IPlayer, play: Play) {
        const { boardTileId, handTileId } = play;
        const boardTile = this.board.getTileById(boardTileId);

        if (!player.getHand().hasTile(handTileId)) {
            throw new Error('Player does not have that tile in their hand!');
        }

        if (boardTile.isPlayed()) {
            throw new Error('This board location has already been played.');
        }

        // Check if tile types match
    }

    public async canMove(player: IPlayer, move: Move) {
        const { boardTileIds } = move;
        const [ boardTileFrom, boardTileTo ] = [boardTileIds.from, boardTileIds.to].map(id => this.board.getTileById(id));

        if (!player.getHand().hasMoveTile()) {
            throw new Error('Player does not have move tile in their hand.');
        }

        // throw new Error('Cannot move tile played by another played.');

        if (!boardTileFrom.isPlayed()) {
            throw new Error('This board location has no tile on it yet.');
        }

        if (boardTileTo.isPlayed()) {
            throw new Error('This board location has already been played.');
        }

        if ([boardTileFrom, boardTileTo].map(tile => tile.getType()).includes(BoardTileType.Water)) {
            throw new Error('Only tiles placed on the ground can be moved to another ground location.');
        }
    }

    public async canSwap(player: IPlayer, swap: Swap) {
        const { boardTileIds, castes } = swap;
        const [ boardTileFrom, boardTileTo ] = [boardTileIds.from, boardTileIds.to].map(id => this.board.getTileById(id));

        if (!player.getHand().hasSwapTile()) {
            throw new Error('Player does not have swap tile in their hand.');
        }

        if (boardTileFrom.getId() === boardTileTo.getId()) {
            throw new Error('Cannot swap caste pieces from/to the same tile.');
        }

        if (!boardTileFrom.hasCaste(castes.from) ||
            !boardTileTo.hasCaste(castes.to)) {
            throw new Error('The given caste pieces do not exist on the specified board tiles.');
        }
    }
}

export default Rules;