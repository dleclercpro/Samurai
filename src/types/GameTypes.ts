export interface Size2D {
    width: number,
    height: number,
}

export interface Coordinates2D {
    x: number,
    y: number,
}

export enum PlayerColor {
    Red,
    Blue,
    Orange,
    Green,
    Unknown,
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

export type BoardTileMap = Map<number, BoardTile>;

export interface BoardTile {
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

export interface Opponent {
    id: number,
    username: string,
    color: PlayerColor,
    score: Map<Caste, number>,
    isPlaying: boolean,
}