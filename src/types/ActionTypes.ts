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

export const SELECT_NEXT_TILE = 'SELECT_NEXT_TILE';
export interface SelectNextTile {
    type: typeof SELECT_NEXT_TILE,
    id: number,
}