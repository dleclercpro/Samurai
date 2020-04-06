import { SELECT_PLAYER_TILE, SelectPlayerTile, SET_PLAYER, SetPlayer, LoadHand, LOAD_HAND, SET_PLAYER_COLOR, SetPlayerColor, DESELECT_PLAYER_TILE, DeselectPlayerTile } from '../types/ActionTypes';
import { PlayerTileJSON } from '../types/JSONTypes';

export const loadHand = (json: PlayerTileJSON[]): LoadHand => ({
    type: LOAD_HAND,
    json,
});

export const setPlayer = (id: number): SetPlayer => ({
    type: SET_PLAYER,
    id,
});

export const setPlayerColor = (color: string): SetPlayerColor => ({
    type: SET_PLAYER_COLOR,
    color,
});

export const selectPlayerTile = (id: number): SelectPlayerTile => ({
    type: SELECT_PLAYER_TILE,
    id,
});

export const deselectPlayerTile: DeselectPlayerTile = {
    type: DESELECT_PLAYER_TILE,
    id: -1,
};