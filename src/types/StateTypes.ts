import { BoardTileMap, PlayerTile, PlayerColor } from './GameTypes';

export interface PlayerState {
    id: number,
    color: PlayerColor,
    hand: PlayerTile[],
    selectedTileId: number,
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