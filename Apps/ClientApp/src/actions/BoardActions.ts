import { BoardData } from '../types/DataTypes';
import { SetBoard, SET_BOARD, ResetBoard, RESET_BOARD } from '../types/ActionTypes';

export const resetBoard: ResetBoard = {
    type: RESET_BOARD,
};

export const setBoard = (data: BoardData): SetBoard => ({
    type: SET_BOARD,
    data,
});