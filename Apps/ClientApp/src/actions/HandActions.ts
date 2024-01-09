import { FullHandData } from '../types/DataTypes';
import { SetFullHand, SET_FULL_HAND, SetOwnHand, SET_OWN_HAND, RESET_OWN_HAND, ResetOwnHand } from '../types/ActionTypes';

export const setFullHand = (data: FullHandData): SetFullHand => ({
    type: SET_FULL_HAND,
    data,
});

export const setOwnHand = (data: number[]): SetOwnHand => ({
    type: SET_OWN_HAND,
    data,
});

export const resetOwnHand: ResetOwnHand = {
    type: RESET_OWN_HAND,
};