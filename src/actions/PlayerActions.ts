import { PlayerJSON, PlayedTilesJSON } from '../types/ServerTypes';
import { LoadPlayer, LOAD_PLAYER, LoadOpponents, LOAD_OPPONENTS, LoadHand, LOAD_HAND, LoadPlayedTilesSinceLastTurn, LOAD_PLAYED_TILES_SINCE_LAST_TURN } from '../types/ActionTypes';

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

export const loadPlayedTilesSinceLastTurn = (playedTiles: PlayedTilesJSON): LoadPlayedTilesSinceLastTurn => ({
    type: LOAD_PLAYED_TILES_SINCE_LAST_TURN,
    playedTiles,
});