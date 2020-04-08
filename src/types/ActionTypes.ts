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
};

export const END_TILE_MOVE = 'END_TILE_MOVE';
export interface EndTileMove {
    type: typeof END_TILE_MOVE,
};



// Caste actions
export const START_CASTE_SWITCH = 'START_CASTE_SWITCH';
export interface StartCasteSwitch {
    type: typeof START_CASTE_SWITCH,
}

export const END_CASTE_SWITCH = 'END_CASTE_SWITCH';
export interface EndCasteSwitch {
    type: typeof END_CASTE_SWITCH,
}

export const SELECT_CASTE_SWITCH_FROM = 'SELECT_CASTE_SWITCH_FROM';
export interface SelectCasteSwitchFrom {
    type: typeof SELECT_CASTE_SWITCH_FROM,
    tile: number,
    caste: Caste,
}

export const SELECT_CASTE_SWITCH_TO = 'SELECT_CASTE_SWITCH_TO';
export interface SelectCasteSwitchTo {
    type: typeof SELECT_CASTE_SWITCH_TO,
    tile: number,
    caste: Caste,
}