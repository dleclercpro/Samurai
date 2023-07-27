import { BoardTileType } from '../models/BoardTile';
import { GameOrder } from '../models/Order';
import { BoardSection, Caste, Coordinates2D, HandTileType } from './GameTypes';

export interface HandTileJSON {
    id: number,
    type: HandTileType,
    strength: number,
    replay: boolean,
}

export interface BoardTileJSON {
    id: number,
    type: BoardTileType,
    sections: BoardSection[],
    coordinates: Coordinates2D,
    neighbors: number[],
    castes: number,
}

export interface TestBoardTileJSON {
    id: number,
    castes: Caste[],
}

export interface TestOrderJSON {
    playerName: string,
    order: GameOrder,
}

export type HandJSON = HandTileJSON[];
export type BoardJSON = BoardTileJSON[];
export type TestBoardJSON = TestBoardTileJSON[];