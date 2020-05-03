import { BoardJSON, HandBoardTileJSON } from '../types/ServerTypes';
import { SetBoard, SET_BOARD, SetFullHand, SET_FULL_HAND } from '../types/ActionTypes';

export const setBoard = (data: BoardJSON): SetBoard => ({
    type: SET_BOARD,
    data,
});

export const setFullHand = (data: HandBoardTileJSON[]): SetFullHand => ({
    type: SET_FULL_HAND,
    data,
});