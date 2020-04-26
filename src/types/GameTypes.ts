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

export interface BoardTile {
    id: number,
    coordinates: Coordinates2D,
    neighborhood: number[],
    castes: Caste[],
    isCity: boolean,
    isWater: boolean,
}

export interface PlayerTile {
    id: number,
    type: TileType,
    strength: number,
    canReplay: boolean,
}

export type BoardTileMap = Map<number, BoardTile>;
export type PlayerTileMap = Map<number, PlayerTile>;

export interface Player {
    id: number,
    username: string,
    isPlaying: boolean,
    color: PlayerColor,
    score: PlayerScore,
    playedTiles: Map<number, number>,
    hasWon: boolean,
}

export enum PlayerColor {
    Red = 'Red',
    Purple = 'Purple',
    Orange = 'Orange',
    Green = 'Green',
    Unknown = 'Unknown',
}

export enum ColorMode {
    Normal = 'Normal',
    Blind = 'Blind',
}

export type PlayerScore = Map<Caste, number>;

export interface CasteSwitch {
    from: {
        tile: number,
        caste: Caste,
    },
    to: {
        tile: number,
        caste: Caste,
    },
}

export interface TileMove {
    from: number,
    to: number,
}

export enum TilePlayStep {
    ChooseBoardTile = 'TilePlay | ChooseBoardTile',
    ChoosePlayerTile = 'TilePlay | ChoosePlayerTile',
    Done = 'TilePlay | Done',
}

export enum TileMoveStep {
    ChoosePlayerTile = 'TileMove | ChoosePlayerTile',
    ChooseBoardTile = 'TileMove | ChooseBoardTile',
    Done = 'TileMove | Done',
}

export enum CasteSwitchStep {
    ChooseTileFrom = 'CasteSwitch | ChooseTileFrom',
    ChooseCasteFrom = 'CasteSwitch | ChooseCasteFrom',
    ChooseFromDone = 'CasteSwitch | ChooseFromDone',
    ChooseTileTo = 'CasteSwitch | ChooseTileTo',
    ChooseCasteTo = 'CasteSwitch | ChooseCasteTo',
    ChooseToDone = 'CasteSwitch | ChooseToDone',
}

export type GameStep =
    TilePlayStep |
    TileMoveStep |
    CasteSwitchStep;