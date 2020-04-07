import { GameState } from "../types/StateTypes";
import { Player, Caste } from "../types/GameTypes";

export const getWinners = (state: GameState) => {
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