import { IPlayer } from '../models/Player';
import { Caste } from '../types/GameTypes';
import { TILE_ID_MOVE, TILE_ID_SWAP } from '../constants';
import { IBoardTile } from '../models/BoardTile';
import { IHandTile } from '../models/HandTile';
import { FromTo } from '../types';

export interface Play {
    handTile: IHandTile,
    boardTiles: FromTo<IBoardTile | null>,
    castes: FromTo<Caste | null>,
}

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
}



/*
   This class is responsible to check whether a given player move is
   correctly formed AND allowed.
*/
class Rules {

    public async canPlay(player: IPlayer, play: Play) {
        const { handTile, boardTiles, castes } = play;
        const someCaste = ![castes.from, castes.to].every(caste => caste === null);

        // Check input parameters for move
        if (handTile.getId() === TILE_ID_MOVE) {
            if ([boardTiles.from, boardTiles.to].includes(null) || someCaste) {
                throw new Error('Wrong parameters.');
            }
            
            return this.canMove(player, { boardTiles } as Move);
        }

        // Check input parameters for swap
        if (handTile.getId() === TILE_ID_SWAP) {
            if ([boardTiles.from, boardTiles.to, castes.from, castes.to].includes(null)) {
                throw new Error('Wrong parameters.');
            }

            return this.canSwap({ boardTiles, castes } as Swap);
        }

        // Check input parameters for normal play
        if (boardTiles.from !== null || boardTiles.to === null || someCaste) {
            throw new Error('Wrong parameters.');
        }

        return this.canNormal({ handTile, boardTile: boardTiles.to } as Normal);
    }

    private async canNormal(play: Normal) {
        const { boardTile, handTile } = play;

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

    private async canMove(player: IPlayer, play: Move) {
        const { boardTiles } = play;
        const playedTile = boardTiles.from.getPlayedTile();

        if (boardTiles.from.isFree()) {
            throw new Error('This board location has no tile on it yet.');
        }

        if (playedTile.getPlayer().getId() !== player.getId()) {
            throw new Error(`Cannot move another player's tile.`);
        }

        if (boardTiles.to.isCity()) {
            throw new Error('This board location is a city.');
        }

        if (!boardTiles.to.isFree()) {
            throw new Error('This board location is not free.');
        }

        if (boardTiles.to.isHandTileCompatible(playedTile.getHandTile())) {
            throw new Error(`Board and hand tiles aren't compatible: ${boardTiles.to.getType()} vs. ${playedTile.getHandTile().getType()}`);
        }

        return true;
    }

    private async canSwap(play: Swap) {
        const { boardTiles, castes } = play;

        if (!boardTiles.from.isCity()) {
            throw new Error(`The starting tile is not a city.`);
        }

        if (!boardTiles.to.isCity()) {
            throw new Error(`The ending tile is not a city.`);
        }

        if (boardTiles.from.getId() === boardTiles.to.getId()) {
            throw new Error('Cannot swap caste pieces from/to the same tile.');
        }

        if (!boardTiles.from.hasCaste(castes.from)) {
            throw new Error(`The given caste piece is not present on the starting tile: ${castes.from}`);
        }

        if (!boardTiles.to.hasCaste(castes.to)) {
            throw new Error(`The given caste piece is not present on the ending tile: ${castes.to}`);
        }

        return true;
    }
}

export default Rules;