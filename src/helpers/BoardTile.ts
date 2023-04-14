import { Caste } from '../types/GameTypes';
import BoardData from './BoardDataManager';
import HandTile from './HandTile';

export interface BoardTileCoordinates {
    x: number,
    y: number,
}

export enum BoardTileType {
    Ground = 'Ground',
    Water = 'Water',
    Swap = 'Swap',
}

interface Argument {
    id: number,
    castes?: Caste[],
    playedTile?: HandTile,
}

class BoardTile {
    protected id: number;
    protected type: BoardTileType;
    protected castes: Caste[];
    protected playedTile?: HandTile;

    public constructor(argument: Argument) {
        const { id, castes, playedTile } = argument;

        this.id = id;
        this.type = BoardData.getTileType(id);
        this.castes = castes ?? [];
        this.playedTile = playedTile;
    }

    public getId() {
        return this.id;
    }

    public getType() {
        return this.type;
    }

    public getCastes() {
        return this.castes;
    }

    public hasCaste(caste: Caste) {
        return this.castes.includes(caste);
    }

    public playTile(tile: HandTile) {
        this.playedTile = tile;
    }

    public isPlayed() {
        return !!this.playedTile;
    }
}

export default BoardTile;