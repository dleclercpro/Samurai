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
    Unknown,
}

export enum TileType {
    Military = 'Military',
    Religion = 'Religion',
    Commerce = 'Commerce',
    Joker = 'Joker',
    Ship = 'Ship',
    Switch = 'Switch',
    Move = 'Move',
    Unknown = 'UnknownTileType',
}

export enum SpecialTileType {
    Replay = 'Replay',
    Unknown = 'UnknownSpecialTileType',
}

export interface BoardTile {
    id: number,
    coordinates: Coordinates2D,
    neighborhood: Coordinates2D[],
    types: TileType[],
    isWater: boolean,
}

export type BoardTileMap = Map<number, BoardTile>;

export interface PlayerTile {
    id: number,
    type: TileType,
    strength: number,
    canReplay: boolean,
}