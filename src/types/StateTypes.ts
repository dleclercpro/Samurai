import { BoardTileMap, PlayerTile, PlayerColor, Opponent } from './GameTypes';

export interface PlayerState {
    id: number,
    color: PlayerColor,
    hand: PlayerTile[],
    selectedTile: number,
    opponents: Opponent[],
}

export interface BoardState {
    tiles: BoardTileMap,
    selectedTile: number,
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