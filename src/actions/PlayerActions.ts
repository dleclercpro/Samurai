import { PlayerJSON } from '../types/ServerTypes';
import { SetPlayer, SET_PLAYER, SetOpponents, SET_OPPONENTS, SetHand, SET_HAND } from '../types/ActionTypes';

export const setPlayer = (data: PlayerJSON): SetPlayer => ({
    type: SET_PLAYER,
    data,
});

export const setOpponents = (data: PlayerJSON[]): SetOpponents => ({
    type: SET_OPPONENTS,
    data,
});

export const setHand = (data: number[]): SetHand => ({
    type: SET_HAND,
    data,
});