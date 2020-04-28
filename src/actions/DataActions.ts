import { BoardJSON, HandTileJSON } from '../types/ServerTypes';
import { LoadBoard, LOAD_BOARD, LoadFullHand, LOAD_FULL_HAND } from '../types/ActionTypes';

export const loadBoard = (data: BoardJSON): LoadBoard => ({
    type: LOAD_BOARD,
    data,
});

export const loadFullHand = (data: HandTileJSON[]): LoadFullHand => ({
    type: LOAD_FULL_HAND,
    data,
});