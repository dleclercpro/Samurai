import { BoardJSON, PlayerTileJSON } from './JSONTypes';

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

export const SET_PLAYER = 'SET_PLAYER';
export interface SetPlayer {
    type: typeof SET_PLAYER,
    id: number,
}

export const SET_PLAYER_COLOR = 'SET_PLAYER_COLOR';
export interface SetPlayerColor {
    type: typeof SET_PLAYER_COLOR,
    color: string,
}

export const SELECT_BOARD_TILE = 'SELECT_BOARD_TILE';
export interface SelectBoardTile {
    type: typeof SELECT_BOARD_TILE,
    id: number,
}

export const DESELECT_BOARD_TILE = 'DESELECT_BOARD_TILE';
export interface DeselectBoardTile {
    type: typeof DESELECT_BOARD_TILE,
    id: number,
}

export const SELECT_PLAYER_TILE = 'SELECT_PLAYER_TILE';
export interface SelectPlayerTile {
    type: typeof SELECT_PLAYER_TILE,
    id: number,
}

export const DESELECT_PLAYER_TILE = 'DESELECT_PLAYER_TILE';
export interface DeselectPlayerTile {
    type: typeof DESELECT_PLAYER_TILE,
    id: number,
}