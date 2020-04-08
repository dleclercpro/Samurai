import { SELECT_PLAYER_TILE, SelectPlayerTile, DESELECT_PLAYER_TILE, DeselectPlayerTile, SELECT_CASTE_SWITCH_FROM, SELECT_CASTE_SWITCH_TO, SelectCasteSwitchFrom, SelectCasteSwitchTo, StartCasteSwitch, START_CASTE_SWITCH, EndCasteSwitch, END_CASTE_SWITCH, SelectBoardTile, SELECT_BOARD_TILE, DeselectBoardTile, DESELECT_BOARD_TILE } from '../types/ActionTypes';
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

export const selectCasteFrom = (tile: number, caste: Caste): SelectCasteSwitchFrom => ({
    type: SELECT_CASTE_SWITCH_FROM,
    tile,
    caste, 
});

export const selectCasteTo = (tile: number, caste: Caste): SelectCasteSwitchTo => ({
    type: SELECT_CASTE_SWITCH_TO,
    tile,
    caste,
});