import { SELECT_PLAYER_TILE, SelectPlayerTile, LOAD_PLAYER, LoadPlayer, LoadHand, LOAD_HAND, DESELECT_PLAYER_TILE, DeselectPlayerTile, LOAD_OPPONENTS, LoadOpponents } from '../types/ActionTypes';
import { PlayerTileJSON, PlayerJSON } from '../types/JSONTypes';

export const loadHand = (json: PlayerTileJSON[]): LoadHand => ({
    type: LOAD_HAND,
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

export const selectPlayerTile = (id: number): SelectPlayerTile => ({
    type: SELECT_PLAYER_TILE,
    id,
});

export const deselectPlayerTile: DeselectPlayerTile = {
    type: DESELECT_PLAYER_TILE,
    id: -1,
};