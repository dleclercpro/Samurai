import { Coordinates2D } from './GameTypes';

export enum CallType {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}



// Server responses
export interface ServerResponse<T> {
    status: number,
    message: string,
    data: T,
}

export interface GameData {
    name: string,
    version: number,
    hand: HandJSON,
    board: BoardJSON,
    players: PlayersJSON,
    lastPlayedTiles: PlayedTilesJSON,
}



// JSON types
export interface UserJSON {
    username: string,
    email: string,
}

export interface BoardTileJSON {
    id: number,
    coordinates: Coordinates2D,
    castes: string[],
    isClosed: boolean,
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

export interface HandTileJSON {
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