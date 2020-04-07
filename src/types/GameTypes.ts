export interface Size2D {
    width: number,
    height: number,
}

export interface Coordinates2D {
    x: number,
    y: number,
}

export enum Caste {
    Military = 'Military',
    Religion = 'Religion',
    Commerce = 'Commerce', 
    Unknown = 'Unknown',
}

export enum Figure {
    Samurai = 'Samurai',
    Ship = 'Ship',
    Unknown = 'Unknown',
}

export enum Action {
    Switch = 'Switch',
    Move = 'Move',
    Replay = 'Replay',
    Unknown = 'Unknown',
}

export type TileType = Caste | Figure | Action | undefined;

export type TileMap = Map<number, Tile>;

export interface Tile {
    id: number,
    coordinates: Coordinates2D,
    neighborhood: number[],
    castes: Caste[],
    isWater: boolean,
}

export interface PlayerTile {
    id: number,
    type: TileType,
    strength: number,
    canReplay: boolean,
}

export type PlayedTileMap = Map<number, number>;

export enum PlayerColor {
    Red = 'Red',
    Blue = 'Blue',
    Orange = 'Orange',
    Green = 'Green',
    Unknown = 'Unknown',
}

export type PlayerScore = Map<Caste, number>;

export interface Player {
    id: number,
    username: string,
    isPlaying: boolean,
    color: PlayerColor,
    score: PlayerScore,
    playedTiles: PlayedTileMap,
}