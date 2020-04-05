import { SELECT_TILE, SelectTile, SET_PLAYER, SetPlayer } from "../types/ActionTypes";

export const selectTile = (id: number): SelectTile => ({
    type: SELECT_TILE,
    id,
});

export const setPlayer = (id: number): SetPlayer => ({
    type: SET_PLAYER,
    id,
});