import { BoardTileCoordinates, BoardTileType } from '../helpers/BoardTile';
import { HandTileType } from '../helpers/HandTile';

export interface HandTileJSON {
    id: number,
    type: HandTileType,
    strength: number,
    canReplay: boolean,
}

export interface BoardTileJSON {
    id: number,
    type: BoardTileType,
    coordinates: BoardTileCoordinates,
    neighbors: number[],
    castes: number,
}

export type HandJSON = HandTileJSON[];
export type BoardJSON = Record<string, BoardTileJSON[]>;