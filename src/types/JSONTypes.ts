import { Coordinates2D } from './GameTypes';

export interface BoardTileJSON {
    id: number,
    coordinates: Coordinates2D,
    castes: string[],
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

export interface PlayerJSON {
    id: number,
    username: string,
    color: string,
    isPlaying: boolean,
    score: PlayerScoreJSON,
}

export interface PlayerScoreJSON {
    'Military': number,
    'Religion': number,
    'Commerce': number,
}