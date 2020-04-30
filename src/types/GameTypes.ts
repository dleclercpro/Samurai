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
    isSwitch: boolean,
}

export interface HandTile {
    id: number,
    type: TileType,
    strength: number,
    canReplay: boolean,
}

export type BoardTileMap = Map<number, BoardTile>;
export type HandTileMap = Map<number, HandTile>;

export interface Player {
    id: number,
    username: string,
    color: PlayerColor,
    hand: number[],
    playedTiles: Map<number, number>, // Board tile ID to hand tile ID
    score: PlayerScore,
    hasWon: boolean,
    isPlaying: boolean,
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
    ChooseHandTile = 'TilePlay | ChooseHandTile',
    Done = 'TilePlay | Done',
}

export enum TileMoveStep {
    ChooseHandTile = 'TileMove | ChooseHandTile',
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