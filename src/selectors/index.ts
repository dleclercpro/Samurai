import { GameState } from "../types/StateTypes";
import { Player, Caste, PlayerTile } from "../types/GameTypes";
import { notUndefined } from "../types/FunctionTypes";

export const getHand = (state: GameState): PlayerTile[] => {
    return state.hand.map((id: number) => (
        state.initHand.get(id)
    )).filter(notUndefined);
}

export const getPlayedTileIds = (state: GameState): number[] => {
    const players = state.opponents.concat(state.player);
    
    return players.reduce((tileIds: number[], player: Player) => {
        const playedTileIds = Array.from(player.playedTiles.values());
        
        return tileIds.concat(playedTileIds);
    }, []);
}

export const getPlayedTiles = (state: GameState): PlayerTile[] => {
    return getPlayedTileIds(state).map((id: number) => (
        state.initHand.get(id)
    )).filter(notUndefined);
}

export const getWinners = (state: GameState): Player[] => {
    const { player, opponents } = state;
    
    const winners = opponents.reduce((winners: Player[], person: Player) => {
        const { score } = person;
    
        const isWinner = (
            (score.get(Caste.Military) || 0) > (winners[0].score.get(Caste.Military) || 0) &&
            (score.get(Caste.Religion) || 0) > (winners[0].score.get(Caste.Religion) || 0) &&
            (score.get(Caste.Commerce) || 0) > (winners[0].score.get(Caste.Commerce) || 0)
        );
    
        if (isWinner) {
            return [ person ];
        }
    
        const isExAequo = (
            (score.get(Caste.Military) || 0) === (winners[0].score.get(Caste.Military) || 0) &&
            (score.get(Caste.Religion) || 0) === (winners[0].score.get(Caste.Religion) || 0) &&
            (score.get(Caste.Commerce) || 0) === (winners[0].score.get(Caste.Commerce) || 0)
        );
    
        if (isExAequo) {
            return winners.concat(person);
        }
    
        return winners;
    }, [ player ]);

    // If everyone wins, everyone lost
    return winners.length === opponents.length + 1 ? [] : winners;
}