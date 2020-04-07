import { SELECT_HAND_TILE, SelectHandTile, LOAD_PLAYER, LoadPlayer, LoadHand, LOAD_HAND, DESELECT_HAND_TILE, DeselectHandTile, LOAD_OPPONENTS, LoadOpponents, LOAD_INIT_HAND, LoadInitHand } from '../types/ActionTypes';
import { PlayerTileJSON, PlayerJSON } from '../types/JSONTypes';

export const loadHand = (json: PlayerTileJSON[]): LoadHand => ({
    type: LOAD_HAND,
    json,
});

export const loadInitHand = (json: PlayerTileJSON[]): LoadInitHand => ({
    type: LOAD_INIT_HAND,
    json,
});

export const loadPlayer = (player: PlayerJSON): LoadPlayer => ({
    type: LOAD_PLAYER,
    player,
});

export const loadOpponents = (opponents: PlayerJSON[]): LoadOpponents => ({
    type: LOAD_OPPONENTS,
    opponents,
});

export const selectHandTile = (id: number): SelectHandTile => ({
    type: SELECT_HAND_TILE,
    id,
});

export const deselectHandTile: DeselectHandTile = {
    type: DESELECT_HAND_TILE,
    id: -1,
};