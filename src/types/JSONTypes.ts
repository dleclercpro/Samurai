import { Coordinates2D } from './GameTypes';

export interface TileJSON {
    id: number,
    coordinates: Coordinates2D,
    castes: string[],
    isWater: boolean,
}

export interface BoardJSON {
    [section: string]: TileJSON[],
}

export type PlayedTileMapJSON = {
    [id: number]: number,
};

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
    playedTiles: PlayedTileMapJSON,
}

export interface PlayerScoreJSON {
    'Military': number,
    'Religion': number,
    'Commerce': number,
}