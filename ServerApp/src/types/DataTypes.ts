/*
    Data types used to communicate with client application
*/

import { Coordinates2D } from './GameTypes';

export interface GameData {
    name: string,
    version: number,
    hand: HandData,
    board: BoardData,
    players: PlayersData,
    playedSinceLastTurn: PlayedTilesData,
}

export interface UserData {
    username: string,
    email: string,
}

export interface BoardData {
    [section: string]: BoardTileData[],
}

export interface BoardTileData {
    id: number,
    coordinates: Coordinates2D,
    castes: string[],
    isClosed: boolean,
    isWater: boolean,
    isSwap: boolean,
}

export type HandData = number[];

export interface FullHandTileData {
    id: number,
    type: string,
    strength: number,
    replay: boolean,
}

export type FullHandData = FullHandTileData[];

export type PlayedTilesData = {
    [id: string]: number,
};

export interface PlayerData {
    id: string,
    username: string,
    color: string,
    isPlaying: boolean,
    playedTiles: PlayedTilesData,
    score: ScoreData,
    hasWon: boolean,
}

export interface PlayersData {
    self: PlayerData,
    opponents: PlayerData[],
}

export interface ScoreData {
    'Military': number,
    'Religion': number,
    'Commerce': number,
}