import { BoardSection } from '../models/Board';
import { BoardTileCoordinates, BoardTileType } from '../models/BoardTile';
import { HandTileType } from './GameTypes';

export interface HandTileJSON {
    id: number,
    type: HandTileType,
    strength: number,
    replay: boolean,
}

export interface BoardTileJSON {
    id: number,
    type: BoardTileType,
    section: BoardSection,
    coordinates: BoardTileCoordinates,
    neighbors: number[],
    castes: number,
}

export type HandJSON = HandTileJSON[];
export type BoardJSON = BoardTileJSON[];