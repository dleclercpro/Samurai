import { Coordinates2D } from './GameTypes';

export interface BoardTileJSON {
    id: number,
    coordinates: Coordinates2D,
    types: string[],
    isWater: boolean,
}

export interface BoardJSON {
    [section: string]: BoardTileJSON[],
}

export interface PlayerTileJSON {
    id: number,
    type: string,
    strength: number,
    canReplay: boolean,
}