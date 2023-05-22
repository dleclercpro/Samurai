import { PlayerData } from '../types/DataTypes';
import { SetSelf, SET_SELF, SetOpponents, SET_OPPONENTS, ResetPlayers, RESET_PLAYERS } from '../types/ActionTypes';

export const resetPlayers: ResetPlayers = {
    type: RESET_PLAYERS,
};

export const setSelf = (data: PlayerData): SetSelf => ({
    type: SET_SELF,
    data,
});

export const setOpponents = (data: PlayerData[]): SetOpponents => ({
    type: SET_OPPONENTS,
    data,
});