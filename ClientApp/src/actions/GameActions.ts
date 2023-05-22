import { SelectBoardTile, SELECT_BOARD_TILE, SelectHandTile, SELECT_HAND_TILE, DeselectBoardTile, DESELECT_BOARD_TILE, DeselectHandTile, DESELECT_HAND_TILE, StartCasteSwap, START_CASTE_SWAP, SelectTileFromForSwap, SELECT_TILE_FROM_FOR_SWAP, SelectCasteFromForSwap, SELECT_CASTE_FROM_FOR_SWAP, SelectTileToForSwap, SELECT_TILE_TO_FOR_SWAP, SelectCasteToForSwap, SELECT_CASTE_TO_FOR_SWAP, DeselectTileFromForSwap, DESELECT_TILE_FROM_FOR_SWAP, DeselectTileToForSwap, DESELECT_TILE_TO_FOR_SWAP, DeselectCasteToForSwap, DESELECT_CASTE_TO_FOR_SWAP, SelectBoardTileToMoveTo, SELECT_BOARD_TILE_TO_MOVE_TO, SelectBoardTileToMoveFrom, SELECT_BOARD_TILE_TO_MOVE_FROM, DeselectCasteFromForSwap, DESELECT_CASTE_FROM_FOR_SWAP, END_TURN, EndTurn, FINISH_CASTE_SWAP, FinishCasteSwap, StartTileMove, START_TILE_MOVE, SetGameId, SET_GAME_ID, SetGameVersion, SET_GAME_VERSION, SetPlayedTilesSinceLastTurn, SET_PLAYED_TILES_SINCE_LAST_TURN, ResetGame, RESET_GAME, SetGameName, SET_GAME_NAME } from '../types/ActionTypes';
import { Caste } from '../types/GameTypes';
import { PlayedTilesData } from '../types/DataTypes';

// Game actions
export const resetGame: ResetGame = {
    type: RESET_GAME,
};

export const endTurn: EndTurn = {
    type: END_TURN,
};

export const setGameId = (id: string): SetGameId => ({
    type: SET_GAME_ID,
    id,
});

export const setGameName = (name: string): SetGameName => ({
    type: SET_GAME_NAME,
    name,
});

export const setGameVersion = (version: number): SetGameVersion => ({
    type: SET_GAME_VERSION,
    version,
});

export const setPlayedTilesSinceLastTurn = (playedTiles: PlayedTilesData): SetPlayedTilesSinceLastTurn => ({
    type: SET_PLAYED_TILES_SINCE_LAST_TURN,
    playedTiles,
});



// Tile selection
export const selectBoardTile = (id: number): SelectBoardTile => ({
    type: SELECT_BOARD_TILE,
    id,
});

export const deselectBoardTile: DeselectBoardTile = {
    type: DESELECT_BOARD_TILE,
    id: -1,
};

export const selectHandTile = (id: number): SelectHandTile => ({
    type: SELECT_HAND_TILE,
    id,
});

export const deselectHandTile: DeselectHandTile = {
    type: DESELECT_HAND_TILE,
    id: -1,
};



// Caste swap
export const startCasteSwap: StartCasteSwap = {
    type: START_CASTE_SWAP,
};

export const finishCasteSwap: FinishCasteSwap = {
    type: FINISH_CASTE_SWAP,
};

export const selectTileFromForSwap = (tile: number): SelectTileFromForSwap => ({
    type: SELECT_TILE_FROM_FOR_SWAP,
    tile,
});

export const deselectTileFromForSwap: DeselectTileFromForSwap = {
    type: DESELECT_TILE_FROM_FOR_SWAP,
    tile: -1,
};

export const selectCasteFromForSwap = (caste: Caste): SelectCasteFromForSwap => ({
    type: SELECT_CASTE_FROM_FOR_SWAP,
    caste,
});

export const deselectCasteFromForSwap: DeselectCasteFromForSwap = {
    type: DESELECT_CASTE_FROM_FOR_SWAP,
    caste: Caste.Unknown,
};

export const selectTileToForSwap = (tile: number): SelectTileToForSwap => ({
    type: SELECT_TILE_TO_FOR_SWAP,
    tile,
});

export const deselectTileToForSwap: DeselectTileToForSwap = {
    type: DESELECT_TILE_TO_FOR_SWAP,
    tile: -1,
};

export const selectCasteToForSwap = (caste: Caste): SelectCasteToForSwap => ({
    type: SELECT_CASTE_TO_FOR_SWAP,
    caste,
});

export const deselectCasteToForSwap: DeselectCasteToForSwap = {
    type: DESELECT_CASTE_TO_FOR_SWAP,
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