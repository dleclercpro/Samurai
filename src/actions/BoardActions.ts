import { LOAD_BOARD, LoadBoard } from "../types/ActionTypes";
import { BoardJSON } from "../types/JSONTypes";

export const loadBoard = (json: BoardJSON): LoadBoard => ({
    type: LOAD_BOARD,
    json,
});