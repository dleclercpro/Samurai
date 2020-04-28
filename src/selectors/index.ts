import { AppState, PlayersState } from '../types/StateTypes';
import { Player, PlayerTile } from '../types/GameTypes';
import { notUndefined } from '../types/FunctionTypes';

export const getHandTiles = (state: AppState): PlayerTile[] => {
    const { data, players } = state;
    const { self } = players;

    return self.hand.map((id: number) => (
        data.initHand.get(id)
    )).filter(notUndefined);
}

export const getBusyBoardTileIds = (state: PlayersState): number[] => {
    const { self, opponents } = state;
    const players = opponents.concat(self);
    
    return players.reduce((boardTileIds: number[], player: Player) => {
        const playedTileIds = Array.from(player.playedTiles.keys());
        
        return boardTileIds.concat(playedTileIds);
    }, []);
}

export const getWinners = (state: PlayersState): Player[] => {
    const { self, opponents } = state;
    
    const winners = opponents.concat(self).filter((person: Player) => person.hasWon);

    // If everyone wins, everyone lost
    return winners.length === opponents.length + 1 ? [] : winners;
}