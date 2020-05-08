import { HandTileJSON } from '../types/ServerTypes';
import { SetFullHand, SET_FULL_HAND, SetOwnHand, SET_OWN_HAND } from '../types/ActionTypes';

export const setFullHand = (data: HandTileJSON[]): SetFullHand => ({
    type: SET_FULL_HAND,
    data,
});

export const setOwnHand = (data: number[]): SetOwnHand => ({
    type: SET_OWN_HAND,
    data,
});