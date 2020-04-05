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
    Purple,
    Gold,
    Green,
}

export enum Caste {
    Military = 'Military',
    Commerce = 'Commerce',
    Religion = 'Religion',
}

export enum SpecialCaste {
    Joker = 'Joker',
    Water = 'Water',
    Switch = 'Switch',
    Move = 'Move',
}

export interface Tile {
    coordinates: Coordinates2D,
    neighborhood: Coordinates2D[],
    spaces: Caste[],
    isWater: boolean,
}

export type TileMap = Map<Coordinates2D, Tile>;

export interface TilePiece {
    type: Caste,
}

export interface LeaderToken {
    type: Caste,
}