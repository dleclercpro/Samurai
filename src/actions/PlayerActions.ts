import { PlayerJSON } from "../types/JSONTypes";
import { LoadPlayer, LOAD_PLAYER, LoadOpponents, LOAD_OPPONENTS, LoadHand, LOAD_HAND } from "../types/ActionTypes";

export const loadPlayer = (data: PlayerJSON): LoadPlayer => ({
    type: LOAD_PLAYER,
    data,
});

export const loadOpponents = (data: PlayerJSON[]): LoadOpponents => ({
    type: LOAD_OPPONENTS,
    data,
});

export const loadHand = (data: number[]): LoadHand => ({
    type: LOAD_HAND,
    data,
});