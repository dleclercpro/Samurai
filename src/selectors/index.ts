import { AppState, PlayerState } from '../types/StateTypes';
import { Player, PlayerTile } from '../types/GameTypes';
import { notUndefined } from '../types/FunctionTypes';

export const getHand = (state: AppState): PlayerTile[] => {
    const { data, player } = state;

    return player.hand.map((id: number) => (
        data.initHand.get(id)
    )).filter(notUndefined);
}

export const getPlayedTileIds = (state: PlayerState): number[] => {
    const { self, opponents } = state;
    const players = opponents.concat(self);
    
    return players.reduce((tileIds: number[], player: Player) => {
        const playedTileIds = Array.from(player.playedTiles.values());
        
        return tileIds.concat(playedTileIds);
    }, []);
}

export const getPlayedTiles = (state: AppState): PlayerTile[] => {
    const { data, player } = state;

    return getPlayedTileIds(player).map((id: number) => (
        data.initHand.get(id)
    )).filter(notUndefined);
}

export const getWinners = (state: PlayerState): Player[] => {
    const { self, opponents } = state;
    
    const winners = opponents.concat(self).filter((person: Player) => person.hasWon);

    // If everyone wins, everyone lost
    return winners.length === opponents.length + 1 ? [] : winners;
}