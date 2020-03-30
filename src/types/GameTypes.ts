export interface Size2D {
    width: number,
    height: number,
}

export interface Position2D {
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
    position: { x: number, y: number },
    size: number,
    room: number,
    neighbors: Tile[],
    castes: Caste[],
    isWater: boolean,
}

export interface TileAssignment {
    type: Caste | SpecialTile,
    strength: number,
    color: Color,
    isWater: boolean,
    isFast: boolean,
}

export interface Piece {
    type: Caste,
}

export interface Token {
    type: Caste,
}