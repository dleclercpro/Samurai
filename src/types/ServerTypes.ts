import { Coordinates2D } from './GameTypes';

export interface ServerResponse {
    status: number,
    message: string,
    data: any,
}

export interface UserJSON {
    username: string,
    email: string,
}

export interface BoardTileJSON {
    id: number,
    coordinates: Coordinates2D,
    castes: string[],
    isCity: boolean,
    isWater: boolean,
    isSwap: boolean,
}

export interface BoardJSON {
    [section: string]: BoardTileJSON[],
}

export type HandJSON = number[];

export type PlayedTilesJSON = {
    [id: string]: number,
};

export interface HandBoardTileJSON {
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
    playedTiles: PlayedTilesJSON,
    score: PlayerScoreJSON,
    hasWon: boolean,
}

export interface PlayersJSON {
    self: PlayerJSON,
    opponents: PlayerJSON[],
}

export interface PlayerScoreJSON {
    'Military': number,
    'Religion': number,
    'Commerce': number,
}