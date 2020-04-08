import { BoardJSON, PlayerTileJSON } from "../types/JSONTypes";
import { LoadBoard, LOAD_BOARD, LoadInitHand, LOAD_INIT_HAND } from "../types/ActionTypes";

export const loadBoard = (data: BoardJSON): LoadBoard => ({
    type: LOAD_BOARD,
    data,
});

export const loadInitHand = (data: PlayerTileJSON[]): LoadInitHand => ({
    type: LOAD_INIT_HAND,
    data,
});