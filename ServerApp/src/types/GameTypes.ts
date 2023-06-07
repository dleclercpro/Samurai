export interface Coordinates2D {
    x: number,
    y: number,
}

export enum Color {
    Red = 'Red',
    Purple = 'Purple',
    Orange = 'Orange',
    Green = 'Green',
}

export enum Caste {
    Military = 'Military',
    Religion = 'Religion',
    Commerce = 'Commerce',
}

export enum BoardSection {
    North = 'North',
    Center = 'Center',
    South = 'South',
    SwapTiles = 'SwapTiles', // Reserved spot for played hand tiles associated with caste swaps
}

export enum HandTileType {
    Military = 'Military',
    Religion = 'Religion',
    Commerce = 'Commerce',
    Samurai = 'Samurai',
    Move = 'Move',
    Swap = 'Swap',
    Ship = 'Ship',
}