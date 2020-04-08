import { SELECT_HAND_TILE, SelectHandTile, LOAD_PLAYER, LoadPlayer, LoadHand, LOAD_HAND, DESELECT_HAND_TILE, DeselectHandTile, LOAD_OPPONENTS, LoadOpponents, LOAD_INIT_HAND, LoadInitHand, SELECT_CASTE_SWITCH_FROM, SELECT_CASTE_SWITCH_TO, SelectCasteSwitchFrom, SelectCasteSwitchTo, StartCasteSwitch, START_CASTE_SWITCH, EndCasteSwitch, END_CASTE_SWITCH } from '../types/ActionTypes';
import { PlayerTileJSON, PlayerJSON } from '../types/JSONTypes';
import { Caste } from '../types/GameTypes';

// Loading
export const loadHand = (data: number[]): LoadHand => ({
    type: LOAD_HAND,
    data,
});

export const loadInitHand = (data: PlayerTileJSON[]): LoadInitHand => ({
    type: LOAD_INIT_HAND,
    data,
});

export const loadPlayer = (data: PlayerJSON): LoadPlayer => ({
    type: LOAD_PLAYER,
    data,
});

export const loadOpponents = (data: PlayerJSON[]): LoadOpponents => ({
    type: LOAD_OPPONENTS,
    data,
});



// Tile selection
export const selectHandTile = (id: number): SelectHandTile => ({
    type: SELECT_HAND_TILE,
    id,
});

export const deselectHandTile: DeselectHandTile = {
    type: DESELECT_HAND_TILE,
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