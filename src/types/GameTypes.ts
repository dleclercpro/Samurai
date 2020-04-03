export interface Size2D {
    width: number,
    height: number,
}

export interface Coordinates2D {
    x: number,
    y: number,
}

export enum Color {
    Red,
    Purple,
    Gold,
    Green,
}

export enum Caste {
    Military,
    Commerce,
    Religion,
}

export enum SpecialTile {
    Samourai,
    Boat,
    Switch,
    Move,
}

export interface Tile {
    coordinates: Coordinates2D,
    neighborhood: Coordinates2D[],
    spaces: Caste[],
    isWater: boolean,
}

export type TileMap = Map<Coordinates2D, Tile>;

export interface Piece {
    type: Caste,
}

export interface Token {
    type: Caste,
}