import { BoardJSON, PlayerTileJSON, PlayerJSON } from './JSONTypes';

export const OPEN_DIALOG = 'OPEN_DIALOG';
export interface OpenDialog {
    type: typeof OPEN_DIALOG,
}

export const CLOSE_DIALOG = 'CLOSE_DIALOG';
export interface CloseDialog {
    type: typeof CLOSE_DIALOG,
}

export const TOGGLE_DIALOG = 'TOGGLE_DIALOG';
export interface ToggleDialog {
    type: typeof TOGGLE_DIALOG,
}

export const LOAD_BOARD = 'LOAD_BOARD';
export interface LoadBoard {
    type: typeof LOAD_BOARD,
    json: BoardJSON,
}

export const LOAD_HAND = 'LOAD_HAND';
export interface LoadHand {
    type: typeof LOAD_HAND,
    json: PlayerTileJSON[],
}

export const LOAD_INIT_HAND = 'LOAD_INIT_HAND';
export interface LoadInitHand {
    type: typeof LOAD_INIT_HAND,
    json: PlayerTileJSON[],
}

export const LOAD_PLAYER = 'LOAD_PLAYER';
export interface LoadPlayer {
    type: typeof LOAD_PLAYER,
    player: PlayerJSON,
}

export const LOAD_OPPONENTS = 'LOAD_OPPONENTS';
export interface LoadOpponents {
    type: typeof LOAD_OPPONENTS,
    opponents: PlayerJSON[],
}

export const SELECT_BOARD_TILE = 'SELECT_BOARD_TILE';
export interface SelectTile {
    type: typeof SELECT_BOARD_TILE,
    id: number,
}

export const DESELECT_BOARD_TILE = 'DESELECT_BOARD_TILE';
export interface DeselectBoardTile {
    type: typeof DESELECT_BOARD_TILE,
    id: number,
}

export const SELECT_HAND_TILE = 'SELECT_HAND_TILE';
export interface SelectHandTile {
    type: typeof SELECT_HAND_TILE,
    id: number,
}

export const DESELECT_HAND_TILE = 'DESELECT_HAND_TILE';
export interface DeselectHandTile {
    type: typeof DESELECT_HAND_TILE,
    id: number,
}