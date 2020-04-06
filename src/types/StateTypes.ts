import { BoardTileMap, PlayerTile, PlayerColor } from './GameTypes';

export interface PlayerState {
    id: number,
    color: PlayerColor,
    hand: PlayerTile[],
    selectedPlayerTile: number,
}

export interface BoardState {
    tiles: BoardTileMap,
    selectedBoardTile: number,
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