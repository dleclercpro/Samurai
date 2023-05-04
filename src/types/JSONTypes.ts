import { BoardSection } from '../models/Board';
import { BoardTileCoordinates, BoardTileType } from '../models/BoardTile';
import { Caste, HandTileType } from './GameTypes';

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

export interface TestBoardTileJSON {
    id: number,
    castes: Caste[],
}

export type HandJSON = HandTileJSON[];
export type BoardJSON = BoardTileJSON[];
export type TestBoardJSON = TestBoardTileJSON[];