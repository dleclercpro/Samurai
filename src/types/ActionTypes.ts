import { BoardJSON, HandJSON } from "./JSONTypes";

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

export const SELECT_TILE = 'SELECT_TILE';
export interface SelectTile {
    type: typeof SELECT_TILE,
    id: number,
}

export const LOAD_BOARD = 'LOAD_BOARD';
export interface LoadBoard {
    type: typeof LOAD_BOARD,
    json: BoardJSON,
}

export const SET_PLAYER = 'SET_PLAYER';
export interface SetPlayer {
    type: typeof SET_PLAYER,
    id: number,
}

export const SET_HAND = 'SET_HAND';
export interface SetHand {
    type: typeof SET_HAND,
    hand: HandJSON,
}