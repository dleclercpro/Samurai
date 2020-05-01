import { PlayerJSON } from '../types/ServerTypes';
import { LoadPlayer, LOAD_PLAYER, LoadOpponents, LOAD_OPPONENTS, LoadHand, LOAD_HAND, RESET_LAST_PLAYED_TILES, SET_LAST_PLAYED_TILES, ResetLastPlayedTiles, SetLastPlayedTiles, ResetPlayedTiles, RESET_PLAYED_TILES, SetPlayedTiles, SET_PLAYED_TILES } from '../types/ActionTypes';

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

export const resetLastPlayedTiles: ResetLastPlayedTiles = {
    type: RESET_LAST_PLAYED_TILES,
};

export const setLastPlayedTiles = (tileIds: number[]): SetLastPlayedTiles => ({
    type: SET_LAST_PLAYED_TILES,
    ids: tileIds,
});

export const resetPlayedTiles: ResetPlayedTiles = {
    type: RESET_PLAYED_TILES,
};

export const setPlayedTiles = (tileIds: number[]): SetPlayedTiles => ({
    type: SET_PLAYED_TILES,
    ids: tileIds,
});