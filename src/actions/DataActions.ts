import { BoardJSON, HandBoardTileJSON } from '../types/ServerTypes';
import { SetBoard, SET_BOARD, SetFullHand, SET_FULL_HAND, ResetBoard, RESET_BOARD } from '../types/ActionTypes';

export const resetBoard: ResetBoard = {
    type: RESET_BOARD,
};

export const setBoard = (data: BoardJSON): SetBoard => ({
    type: SET_BOARD,
    data,
});

export const setFullHand = (data: HandBoardTileJSON[]): SetFullHand => ({
    type: SET_FULL_HAND,
    data,
});