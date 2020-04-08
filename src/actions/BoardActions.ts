import { LOAD_BOARD, LoadBoard, SELECT_BOARD_TILE, SelectTile, DESELECT_BOARD_TILE, DeselectBoardTile } from '../types/ActionTypes';
import { BoardJSON } from '../types/JSONTypes';

export const loadBoard = (data: BoardJSON): LoadBoard => ({
    type: LOAD_BOARD,
    data,
});

export const selectTile = (id: number): SelectTile => ({
    type: SELECT_BOARD_TILE,
    id,
});

export const deselectBoardTile: DeselectBoardTile = {
    type: DESELECT_BOARD_TILE,
    id: -1,
};