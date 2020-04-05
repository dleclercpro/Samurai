import { Coordinates2D } from './GameTypes';

export interface BoardTileJSON {
    isWater: boolean,
    coordinates: Coordinates2D,
    neighbors?: BoardTileJSON[],
    types: string[],
}

export interface BoardJSON {
    [tiles: string]: BoardTileJSON[],
}

export interface PlayerTileJSON {
    id: number,
    type: string,
    strength?: number,
}

export type HandJSON = PlayerTileJSON[];