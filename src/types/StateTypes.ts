import { BoardTileMap, PlayerTile } from "./GameTypes";

export interface PlayerState {
    id: number,
    selectedTileId: number,
    hand: PlayerTile[],
}

export interface BoardState {
    tiles: BoardTileMap,
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