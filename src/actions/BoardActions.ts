import { LOAD_BOARD, LoadBoard, SELECT_BOARD_TILE, SelectBoardTile, DESELECT_BOARD_TILE, DeselectBoardTile } from '../types/ActionTypes';
import { BoardJSON } from '../types/JSONTypes';

export const loadBoard = (json: BoardJSON): LoadBoard => ({
    type: LOAD_BOARD,
    json,
});

export const selectBoardTile = (id: number): SelectBoardTile => ({
    type: SELECT_BOARD_TILE,
    id,
});

export const deselectBoardTile: DeselectBoardTile = {
    type: DESELECT_BOARD_TILE,
    id: -1,
};