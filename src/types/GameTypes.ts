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

export enum TileType {
    Military,
    Commerce,
    Religion,
    Joker,
    Boat,
    Switch,
    Move,
}

export interface BoardTile {
    coordinates: Coordinates2D,
    neighborhood: Coordinates2D[],
    types: TileType[],
    isWater: boolean,
}

export type BoardTileMap = Map<Coordinates2D, BoardTile>;

export interface PlayerTile {
    id: number,
    type: TileType,
    strength?: number,
}