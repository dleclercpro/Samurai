import { SELECT_PLAYER_TILE, SelectPlayerTile, DESELECT_PLAYER_TILE, DeselectPlayerTile, SELECT_CASTE_SWITCH_FROM, SELECT_CASTE_SWITCH_TO, SelectCasteSwitchFrom, SelectCasteSwitchTo, StartCasteSwitch, START_CASTE_SWITCH, EndCasteSwitch, END_CASTE_SWITCH, SelectBoardTile, SELECT_BOARD_TILE, DeselectBoardTile, DESELECT_BOARD_TILE, DeselectCasteSwitchFrom, DESELECT_CASTE_SWITCH_FROM, DeselectCasteSwitchTo, DESELECT_CASTE_SWITCH_TO, SelectCasteSwitchTile, SELECT_CASTE_SWITCH_TILE, SelectCasteForSwitch, SELECT_CASTE_FOR_SWITCH, DeselectCasteSwitchTile, DESELECT_CASTE_SWITCH_TILE, DeselectCasteForSwitch, DESELECT_CASTE_FOR_SWITCH } from '../types/ActionTypes';
import { Caste } from '../types/GameTypes';

// Tile selection
export const selectBoardTile = (id: number): SelectBoardTile => ({
    type: SELECT_BOARD_TILE,
    id,
});

export const deselectBoardTile: DeselectBoardTile = {
    type: DESELECT_BOARD_TILE,
    id: -1,
};

export const selectPlayerTile = (id: number): SelectPlayerTile => ({
    type: SELECT_PLAYER_TILE,
    id,
});

export const deselectPlayerTile: DeselectPlayerTile = {
    type: DESELECT_PLAYER_TILE,
    id: -1,
};



// Caste switch
export const startCasteSwitch: StartCasteSwitch = {
    type: START_CASTE_SWITCH,
};

export const endCasteSwitch: EndCasteSwitch = {
    type: END_CASTE_SWITCH,
};

export const selectCasteSwitchTile = (tile: number): SelectCasteSwitchTile => ({
    type: SELECT_CASTE_SWITCH_TILE,
    tile,
});

export const selectCasteForSwitch = (caste: Caste): SelectCasteForSwitch => ({
    type: SELECT_CASTE_FOR_SWITCH,
    caste,
});

export const deselectCasteSwitchTile: DeselectCasteSwitchTile = {
    type: DESELECT_CASTE_SWITCH_TILE,
};

export const deselectCasteForSwitch: DeselectCasteForSwitch = {
    type: DESELECT_CASTE_FOR_SWITCH,
};

export const selectCasteSwitchFrom = (tile: number, caste: Caste): SelectCasteSwitchFrom => ({
    type: SELECT_CASTE_SWITCH_FROM,
    tile,
    caste,
});

export const selectCasteSwitchTo = (tile: number, caste: Caste): SelectCasteSwitchTo => ({
    type: SELECT_CASTE_SWITCH_TO,
    tile,
    caste,
});

export const deselectCasteSwitchFrom: DeselectCasteSwitchFrom = {
    type: DESELECT_CASTE_SWITCH_FROM,
};

export const deselectCasteSwitchTo: DeselectCasteSwitchTo = {
    type: DESELECT_CASTE_SWITCH_TO,
};