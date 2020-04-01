import { Coordinates2D } from './GameTypes';

export interface TileJSON {
    isWater: boolean,
    coordinates: Coordinates2D,
    neighbors?: TileJSON[],
    spaces: string[],
}

export interface BoardJSON {
    [tiles: string]: TileJSON[],
}