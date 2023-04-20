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

export enum SpecialHandTileType {
    Samurai = 'Samurai',
    Move = 'Move',
    Swap = 'Swap',
    Ship = 'Ship',
}

export const HandTileType = { ...Caste, ...SpecialHandTileType };
export type HandTileType = typeof HandTileType;