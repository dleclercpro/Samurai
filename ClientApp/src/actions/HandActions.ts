import { HandTileData } from '../types/DataTypes';
import { SetFullHand, SET_FULL_HAND, SetOwnHand, SET_OWN_HAND } from '../types/ActionTypes';

export const setFullHand = (data: HandTileData[]): SetFullHand => ({
    type: SET_FULL_HAND,
    data,
});

export const setOwnHand = (data: number[]): SetOwnHand => ({
    type: SET_OWN_HAND,
    data,
});