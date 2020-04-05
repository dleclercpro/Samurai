import { SELECT_NEXT_TILE, SelectNextTile, SET_PLAYER, SetPlayer, LoadHand, LOAD_HAND, SET_PLAYER_COLOR, SetPlayerColor } from '../types/ActionTypes';
import { PlayerTileJSON } from '../types/JSONTypes';

export const selectTile = (id: number): SelectNextTile => ({
    type: SELECT_NEXT_TILE,
    id,
});

export const setPlayer = (id: number): SetPlayer => ({
    type: SET_PLAYER,
    id,
});

export const setPlayerColor = (color: string): SetPlayerColor => ({
    type: SET_PLAYER_COLOR,
    color,
});

export const loadHand = (json: PlayerTileJSON[]): LoadHand => ({
    type: LOAD_HAND,
    json,
});