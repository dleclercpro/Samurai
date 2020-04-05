import { Tile, TileMap } from "./GameTypes";

export interface PlayerState {
    id: number,
    selectedTileId: number,
}

export interface BoardState {
    tiles: TileMap,
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