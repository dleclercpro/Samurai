import { SelectBoardTile, SELECT_BOARD_TILE, SelectPlayerTile, SELECT_PLAYER_TILE, DeselectBoardTile, DESELECT_BOARD_TILE, DeselectPlayerTile, DESELECT_PLAYER_TILE, StartCasteSwitch, START_CASTE_SWITCH, SelectTileFromForSwitch, SELECT_TILE_FROM_FOR_SWITCH, SelectCasteFromForSwitch, SELECT_CASTE_FROM_FOR_SWITCH, SelectTileToForSwitch, SELECT_TILE_TO_FOR_SWITCH, SelectCasteToForSwitch, SELECT_CASTE_TO_FOR_SWITCH, DeselectTileFromForSwitch, DESELECT_TILE_FROM_FOR_SWITCH, DeselectTileToForSwitch, DESELECT_TILE_TO_FOR_SWITCH, DeselectCasteToForSwitch, DESELECT_CASTE_TO_FOR_SWITCH, SelectBoardTileToMoveTo, SELECT_BOARD_TILE_TO_MOVE_TO, SelectBoardTileToMoveFrom, SELECT_BOARD_TILE_TO_MOVE_FROM, DeselectCasteFromForSwitch, DESELECT_CASTE_FROM_FOR_SWITCH, END_TURN, EndTurn, FINISH_CASTE_SWITCH, FinishCasteSwitch, StartTileMove, START_TILE_MOVE, SwitchColors, SWITCH_COLORS, SetGameId, SET_GAME_ID } from '../types/ActionTypes';
import { Caste } from '../types/GameTypes';


// Game actions
export const setGameId = (id: number): SetGameId => ({
    type: SET_GAME_ID,
    id,
});

export const endTurn: EndTurn = {
    type: END_TURN,
};

export const switchColors: SwitchColors = {
    type: SWITCH_COLORS,
};



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

export const finishCasteSwitch: FinishCasteSwitch = {
    type: FINISH_CASTE_SWITCH,
};

export const selectTileFromForSwitch = (tile: number): SelectTileFromForSwitch => ({
    type: SELECT_TILE_FROM_FOR_SWITCH,
    tile,
});

export const deselectTileFromForSwitch: DeselectTileFromForSwitch = {
    type: DESELECT_TILE_FROM_FOR_SWITCH,
    tile: -1,
};

export const selectCasteFromForSwitch = (caste: Caste): SelectCasteFromForSwitch => ({
    type: SELECT_CASTE_FROM_FOR_SWITCH,
    caste,
});

export const deselectCasteFromForSwitch: DeselectCasteFromForSwitch = {
    type: DESELECT_CASTE_FROM_FOR_SWITCH,
    caste: Caste.Unknown,
};

export const selectTileToForSwitch = (tile: number): SelectTileToForSwitch => ({
    type: SELECT_TILE_TO_FOR_SWITCH,
    tile,
});

export const deselectTileToForSwitch: DeselectTileToForSwitch = {
    type: DESELECT_TILE_TO_FOR_SWITCH,
    tile: -1,
};

export const selectCasteToForSwitch = (caste: Caste): SelectCasteToForSwitch => ({
    type: SELECT_CASTE_TO_FOR_SWITCH,
    caste,
});

export const deselectCasteToForSwitch: DeselectCasteToForSwitch = {
    type: DESELECT_CASTE_TO_FOR_SWITCH,
    caste: Caste.Unknown,
};



// Move actions
export const startTileMove: StartTileMove = {
    type: START_TILE_MOVE,
};

export const selectBoardTileToMoveFrom = (tile: number): SelectBoardTileToMoveFrom => ({
    type: SELECT_BOARD_TILE_TO_MOVE_FROM,
    tile,
});

export const selectBoardTileToMoveTo = (tile: number): SelectBoardTileToMoveTo => ({
    type: SELECT_BOARD_TILE_TO_MOVE_TO,
    tile,
});