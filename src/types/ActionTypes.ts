import { BoardJSON, PlayerTileJSON, PlayerJSON } from './JSONTypes';
import { DialogType } from './DialogTypes';
import { Caste } from './GameTypes';

// Data actions
export const LOAD_BOARD = 'LOAD_BOARD';
export interface LoadBoard {
    type: typeof LOAD_BOARD,
    data: BoardJSON,
}

export const LOAD_INIT_HAND = 'LOAD_INIT_HAND';
export interface LoadInitHand {
    type: typeof LOAD_INIT_HAND,
    data: PlayerTileJSON[],
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
}

export const SET_ERROR_DIALOG = 'SET_ERROR_DIALOG';
export interface SetErrorDialog {
    type: typeof SET_ERROR_DIALOG,
    message: string,
}



// Game actions
export const END_TURN = 'END_TURN';
export interface EndTurn {
    type: typeof END_TURN,
};

export const SWITCH_COLORS = 'SWITCH_COLORS';
export interface SwitchColors {
    type: typeof SWITCH_COLORS,
};



// Tile actions
export const SELECT_BOARD_TILE = 'SELECT_BOARD_TILE';
export interface SelectBoardTile {
    type: typeof SELECT_BOARD_TILE,
    id: number,
}

export const DESELECT_BOARD_TILE = 'DESELECT_BOARD_TILE';
export interface DeselectBoardTile {
    type: typeof DESELECT_BOARD_TILE,
}

export const SELECT_PLAYER_TILE = 'SELECT_PLAYER_TILE';
export interface SelectPlayerTile {
    type: typeof SELECT_PLAYER_TILE,
    id: number,
}

export const DESELECT_PLAYER_TILE = 'DESELECT_PLAYER_TILE';
export interface DeselectPlayerTile {
    type: typeof DESELECT_PLAYER_TILE,
}



// Move actions
export const START_TILE_MOVE = 'START_TILE_MOVE';
export interface StartTileMove {
    type: typeof START_TILE_MOVE,
};

export const SELECT_PLAYER_TILE_FOR_MOVE = 'SELECT_PLAYER_TILE_FOR_MOVE';
export interface SelectPlayerTileForMove {
    type: typeof SELECT_PLAYER_TILE_FOR_MOVE,
    tile: number,
}

export const SELECT_BOARD_TILE_FOR_MOVE = 'SELECT_BOARD_TILE_FOR_MOVE';
export interface SelectBoardTileForMove {
    type: typeof SELECT_BOARD_TILE_FOR_MOVE,
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
}

export const SELECT_CASTE_FROM_FOR_SWITCH = 'SELECT_CASTE_FROM_FOR_SWITCH';
export interface SelectCasteFromForSwitch {
    type: typeof SELECT_CASTE_FROM_FOR_SWITCH,
    caste: Caste,
}

export const DESELECT_CASTE_FROM_FOR_SWITCH = 'DESELECT_CASTE_FROM_FOR_SWITCH';
export interface DeselectCasteFromForSwitch {
    type: typeof DESELECT_CASTE_FROM_FOR_SWITCH,
}

export const SELECT_TILE_TO_FOR_SWITCH = 'SELECT_TILE_TO_FOR_SWITCH';
export interface SelectTileToForSwitch {
    type: typeof SELECT_TILE_TO_FOR_SWITCH,
    tile: number,
}

export const DESELECT_TILE_TO_FOR_SWITCH = 'DESELECT_TILE_TO_FOR_SWITCH';
export interface DeselectTileToForSwitch {
    type: typeof DESELECT_TILE_TO_FOR_SWITCH,
}

export const SELECT_CASTE_TO_FOR_SWITCH = 'SELECT_CASTE_TO_FOR_SWITCH';
export interface SelectCasteToForSwitch {
    type: typeof SELECT_CASTE_TO_FOR_SWITCH,
    caste: Caste,
}

export const DESELECT_CASTE_TO_FOR_SWITCH = 'DESELECT_CASTE_TO_FOR_SWITCH';
export interface DeselectCasteToForSwitch {
    type: typeof DESELECT_CASTE_TO_FOR_SWITCH,
}