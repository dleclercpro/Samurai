import { BoardTileMap, PlayerTile, Player } from './GameTypes';

export interface PlayerState {
    self: Player,
    opponents: Player[],
    hand: PlayerTile[],
    selectedTileID: number,
}

export interface BoardState {
    tiles: BoardTileMap,
    selectedTileID: number,
}

export interface DialogState {
    isOpen: boolean,
}

// Root state
export interface AppState {
    player: PlayerState,
    board: BoardState,
    dialog: DialogState,
};