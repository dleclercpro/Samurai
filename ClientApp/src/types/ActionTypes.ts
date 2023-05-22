import { BoardData, HandTileData, PlayerData, PlayedTilesData } from './DataTypes';
import { DialogType } from './DialogTypes';
import { Caste, Language } from './GameTypes';
import { AppAction } from '../actions';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AppState } from './StateTypes';

// Server actions
export type AppThunkDispatch<R> = ThunkDispatch<AppState, Promise<R>, AppAction>;
export type AppThunkAction<R> = ThunkAction<Promise<R>, AppState, Promise<R>, AppAction>;



// Game actions
export const RESET_GAME = 'RESET_GAME';
export interface ResetGame {
    type: typeof RESET_GAME,
}

export const SET_GAME_ID = 'SET_GAME_ID';
export interface SetGameId {
    type: typeof SET_GAME_ID,
    id: string,
}

export const SET_GAME_NAME = 'SET_GAME_NAME';
export interface SetGameName {
    type: typeof SET_GAME_NAME,
    name: string,
}

export const SET_GAME_VERSION = 'SET_GAME_VERSION';
export interface SetGameVersion {
    type: typeof SET_GAME_VERSION,
    version: number,
}

export const END_TURN = 'END_TURN';
export interface EndTurn {
    type: typeof END_TURN,
}

export const SWITCH_COLOR_MODE = 'SWITCH_COLOR_MODE';
export interface SwitchColorMode {
    type: typeof SWITCH_COLOR_MODE,
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

export const SET_LANGUAGE = 'SET_LANGUAGE';
export interface SetLanguage {
    type: typeof SET_LANGUAGE,
    language: Language,
}



// Player actions
export const RESET_PLAYERS = 'RESET_PLAYERS';
export interface ResetPlayers {
    type: typeof RESET_PLAYERS,
}

export const SET_SELF = 'SET_SELF';
export interface SetSelf {
    type: typeof SET_SELF,
    data: PlayerData,
}

export const SET_OPPONENTS = 'SET_OPPONENTS';
export interface SetOpponents {
    type: typeof SET_OPPONENTS,
    data: PlayerData[],
}

export const SET_PLAYED_TILES_SINCE_LAST_TURN = 'SET_PLAYED_TILES_SINCE_LAST_TURN';
export interface SetPlayedTilesSinceLastTurn {
    type: typeof SET_PLAYED_TILES_SINCE_LAST_TURN,
    playedTiles: PlayedTilesData,
}



// Hand actions
export const SET_FULL_HAND = 'SET_FULL_HAND';
export interface SetFullHand {
    type: typeof SET_FULL_HAND,
    data: HandTileData[],
}

export const SET_OWN_HAND = 'SET_OWN_HAND';
export interface SetOwnHand {
    type: typeof SET_OWN_HAND,
    data: number[],
}



// Board actions
export const RESET_BOARD = 'RESET_BOARD';
export interface ResetBoard {
    type: typeof RESET_BOARD,
}

export const SET_BOARD = 'SET_BOARD';
export interface SetBoard {
    type: typeof SET_BOARD,
    data: BoardData,
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
export const START_CASTE_SWAP = 'START_CASTE_SWAP';
export interface StartCasteSwap {
    type: typeof START_CASTE_SWAP,
}

export const FINISH_CASTE_SWAP = 'FINISH_CASTE_SWAP';
export interface FinishCasteSwap {
    type: typeof FINISH_CASTE_SWAP,
}

export const SELECT_TILE_FROM_FOR_SWAP = 'SELECT_TILE_FROM_FOR_SWAP';
export interface SelectTileFromForSwap {
    type: typeof SELECT_TILE_FROM_FOR_SWAP,
    tile: number,
}

export const DESELECT_TILE_FROM_FOR_SWAP = 'DESELECT_TILE_FROM_FOR_SWAP';
export interface DeselectTileFromForSwap {
    type: typeof DESELECT_TILE_FROM_FOR_SWAP,
    tile: number,
}

export const SELECT_CASTE_FROM_FOR_SWAP = 'SELECT_CASTE_FROM_FOR_SWAP';
export interface SelectCasteFromForSwap {
    type: typeof SELECT_CASTE_FROM_FOR_SWAP,
    caste: Caste,
}

export const DESELECT_CASTE_FROM_FOR_SWAP = 'DESELECT_CASTE_FROM_FOR_SWAP';
export interface DeselectCasteFromForSwap {
    type: typeof DESELECT_CASTE_FROM_FOR_SWAP,
    caste: Caste,
}

export const SELECT_TILE_TO_FOR_SWAP = 'SELECT_TILE_TO_FOR_SWAP';
export interface SelectTileToForSwap {
    type: typeof SELECT_TILE_TO_FOR_SWAP,
    tile: number,
}

export const DESELECT_TILE_TO_FOR_SWAP = 'DESELECT_TILE_TO_FOR_SWAP';
export interface DeselectTileToForSwap {
    type: typeof DESELECT_TILE_TO_FOR_SWAP,
    tile: number,
}

export const SELECT_CASTE_TO_FOR_SWAP = 'SELECT_CASTE_TO_FOR_SWAP';
export interface SelectCasteToForSwap {
    type: typeof SELECT_CASTE_TO_FOR_SWAP,
    caste: Caste,
}

export const DESELECT_CASTE_TO_FOR_SWAP = 'DESELECT_CASTE_TO_FOR_SWAP';
export interface DeselectCasteToForSwap {
    type: typeof DESELECT_CASTE_TO_FOR_SWAP,
    caste: Caste,
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

export const SET_DIALOG_TEXT = 'SET_DIALOG_TEXT';
export interface SetDialogText {
    type: typeof SET_DIALOG_TEXT,
    dialogType: DialogType,
    message: string,
    explanation: string,
}

export const SET_DIALOG_ACTION = 'SET_DIALOG_ACTION';
export interface SetDialogAction {
    type: typeof SET_DIALOG_ACTION,
    dialogType: DialogType,
    action: () => Promise<void>,
}