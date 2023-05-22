export interface Size2D {
    width: number,
    height: number,
}

export interface Coordinates2D {
    x: number,
    y: number,
}

export enum Language {
    EN = 'en',
    DE = 'de',
    FR = 'fr',
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
    Swap = 'Swap',
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
    isClosed: boolean,
    isWater: boolean,
    isSwap: boolean,
}

export interface HandTile {
    id: number,
    type: TileType,
    strength: number,
    canReplay: boolean,
}

export type BoardTileMap = Map<number, BoardTile>;
export type HandTileMap = Map<number, HandTile>;
export type PlayedTileMap = Map<number, number>; // Board tile ID -> Hand tile ID
export type PlayerScore = Map<Caste, number>;

export interface Player {
    id: string,
    username: string,
    color: PlayerColor,
    playedTiles: PlayedTileMap,
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

export interface CasteSwap {
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

export enum CasteSwapStep {
    ChooseTileFrom = 'CasteSwap | ChooseTileFrom',
    ChooseCasteFrom = 'CasteSwap | ChooseCasteFrom',
    ChooseFromDone = 'CasteSwap | ChooseFromDone',
    ChooseTileTo = 'CasteSwap | ChooseTileTo',
    ChooseCasteTo = 'CasteSwap | ChooseCasteTo',
    ChooseToDone = 'CasteSwap | ChooseToDone',
}

export type GameStep =
    TilePlayStep |
    TileMoveStep |
    CasteSwapStep;