import { BoardJSON, PlayerTileJSON, PlayerJSON } from './ServerTypes';
import { DialogType } from './DialogTypes';
import { Caste } from './GameTypes';
import { AppAction } from '../actions';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState } from './StateTypes';

// Server actions
export type ThunkDispatchResult<R> = ThunkDispatch<AppState, Promise<R>, AppAction>;
export type ThunkActionResult<R> = ThunkAction<Promise<R>, AppState, {}, AppAction>;



// Data actions
export const LOAD_BOARD = 'LOAD_BOARD';
export interface LoadBoard {
    type: typeof LOAD_BOARD,
    data: BoardJSON,
}

export const LOAD_FULL_HAND = 'LOAD_FULL_HAND';
export interface LoadFullHand {
    type: typeof LOAD_FULL_HAND,
    data: PlayerTileJSON[],
}



// Game actions
export const RESET_GAME_ID = 'RESET_GAME_ID';
export interface ResetGameId {
    type: typeof RESET_GAME_ID,
}

export const SET_GAME_ID = 'SET_GAME_ID';
export interface SetGameId {
    type: typeof SET_GAME_ID,
    id: number,
}

export const END_TURN = 'END_TURN';
export interface EndTurn {
    type: typeof END_TURN,
}

export const SWITCH_COLORS = 'SWITCH_COLORS';
export interface SwitchColors {
    type: typeof SWITCH_COLORS,
}



// User actions
export const SET_USER = 'SET_USER';
export interface SetUser {
    type: typeof SET_USER,
    username: string,
    email: string,
}

export const RESET_USER = 'RESET_USER';
export interface ResetUser {
    type: typeof RESET_USER,
}



// Player actions
export const LOAD_PLAYER = 'LOAD_PLAYER';
export interface LoadPlayer {
    type: typeof LOAD_PLAYER,
    data: PlayerJSON,
}

export const LOAD_OPPONENTS = 'LOAD_OPPONENTS';
export interface LoadOpponents {
    type: typeof LOAD_OPPONENTS,
    data: PlayerJSON[],
}

export const LOAD_HAND = 'LOAD_HAND';
export interface LoadHand {
    type: typeof LOAD_HAND,
    data: number[],
}



// Overlay actions
export const OPEN_SPINNER_OVERLAY = 'OPEN_SPINNER_OVERLAY';
export interface OpenSpinnerOverlay {
    type: typeof OPEN_SPINNER_OVERLAY,
}

export const CLOSE_SPINNER_OVERLAY = 'CLOSE_SPINNER_OVERLAY';
export interface CloseSpinnerOverlay {
    type: typeof CLOSE_SPINNER_OVERLAY,
}



// Dialog actions
export const OPEN_DIALOG = 'OPEN_DIALOG';
export interface OpenDialog {
    type: typeof OPEN_DIALOG,
    dialogType: DialogType,
}

export const CLOSE_DIALOG = 'CLOSE_DIALOG';
export interface CloseDialog {
    type: typeof CLOSE_DIALOG,
    dialogType: DialogType,
}

export const SET_SUCCESS_DIALOG = 'SET_SUCCESS_DIALOG';
export interface SetSuccessDialog {
    type: typeof SET_SUCCESS_DIALOG,
    message: string,
    action?: () => Promise<void>,
}

export const SET_ERROR_DIALOG = 'SET_ERROR_DIALOG';
export interface SetErrorDialog {
    type: typeof SET_ERROR_DIALOG,
    message: string,
    explanation: string,
    action?: () => Promise<void>,
}



// Tile actions
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



// Move actions
export const START_TILE_MOVE = 'START_TILE_MOVE';
export interface StartTileMove {
    type: typeof START_TILE_MOVE,
}

export const SELECT_BOARD_TILE_TO_MOVE_FROM = 'SELECT_BOARD_TILE_TO_MOVE_FROM';
export interface SelectBoardTileToMoveFrom {
    type: typeof SELECT_BOARD_TILE_TO_MOVE_FROM,
    tile: number,
}

export const SELECT_BOARD_TILE_TO_MOVE_TO = 'SELECT_BOARD_TILE_TO_MOVE_TO';
export interface SelectBoardTileToMoveTo {
    type: typeof SELECT_BOARD_TILE_TO_MOVE_TO,
    tile: number,
}

export const CANCEL_TILE_MOVE = 'CANCEL_TILE_MOVE';
export interface CancelTileMove {
    type: typeof CANCEL_TILE_MOVE,
}



// Caste actions
export const START_CASTE_SWITCH = 'START_CASTE_SWITCH';
export interface StartCasteSwitch {
    type: typeof START_CASTE_SWITCH,
}

export const FINISH_CASTE_SWITCH = 'FINISH_CASTE_SWITCH';
export interface FinishCasteSwitch {
    type: typeof FINISH_CASTE_SWITCH,
}

export const SELECT_TILE_FROM_FOR_SWITCH = 'SELECT_TILE_FROM_FOR_SWITCH';
export interface SelectTileFromForSwitch {
    type: typeof SELECT_TILE_FROM_FOR_SWITCH,
    tile: number,
}

export const DESELECT_TILE_FROM_FOR_SWITCH = 'DESELECT_TILE_FROM_FOR_SWITCH';
export interface DeselectTileFromForSwitch {
    type: typeof DESELECT_TILE_FROM_FOR_SWITCH,
    tile: number,
}

export const SELECT_CASTE_FROM_FOR_SWITCH = 'SELECT_CASTE_FROM_FOR_SWITCH';
export interface SelectCasteFromForSwitch {
    type: typeof SELECT_CASTE_FROM_FOR_SWITCH,
    caste: Caste,
}

export const DESELECT_CASTE_FROM_FOR_SWITCH = 'DESELECT_CASTE_FROM_FOR_SWITCH';
export interface DeselectCasteFromForSwitch {
    type: typeof DESELECT_CASTE_FROM_FOR_SWITCH,
    caste: Caste,
}

export const SELECT_TILE_TO_FOR_SWITCH = 'SELECT_TILE_TO_FOR_SWITCH';
export interface SelectTileToForSwitch {
    type: typeof SELECT_TILE_TO_FOR_SWITCH,
    tile: number,
}

export const DESELECT_TILE_TO_FOR_SWITCH = 'DESELECT_TILE_TO_FOR_SWITCH';
export interface DeselectTileToForSwitch {
    type: typeof DESELECT_TILE_TO_FOR_SWITCH,
    tile: number,
}

export const SELECT_CASTE_TO_FOR_SWITCH = 'SELECT_CASTE_TO_FOR_SWITCH';
export interface SelectCasteToForSwitch {
    type: typeof SELECT_CASTE_TO_FOR_SWITCH,
    caste: Caste,
}

export const DESELECT_CASTE_TO_FOR_SWITCH = 'DESELECT_CASTE_TO_FOR_SWITCH';
export interface DeselectCasteToForSwitch {
    type: typeof DESELECT_CASTE_TO_FOR_SWITCH,
    caste: Caste,
}