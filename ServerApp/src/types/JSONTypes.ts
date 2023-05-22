import { BoardSection } from '../models/Board';
import { BoardTileType } from '../models/BoardTile';
import { Caste, Coordinates2D, HandTileType } from './GameTypes';

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
    coordinates: Coordinates2D,
    neighbors: number[],
    castes: number,
}

export interface TestBoardTileJSON {
    id: number,
    castes: Caste[],
}

export type HandJSON = HandTileJSON[];
export type BoardJSON = BoardTileJSON[];
export type TestBoardJSON = TestBoardTileJSON[];