import { AppState, PlayersState } from '../types/StateTypes';
import { Player, HandTile, PlayerScore, Caste } from '../types/GameTypes';
import { notUndefined } from '../types/FunctionTypes';
import { CASTES } from '../constants';

export const getHandTiles = (state: AppState): HandTile[] => {
    const { data, players } = state;
    const { self } = players;

    return self.hand.map((id: number) => (
        data.fullHand.get(id)
    )).filter(notUndefined);
}

export const getTakenBoardTileIds = (state: PlayersState): number[] => {
    const { self, opponents } = state;
    const players = opponents.concat(self);
    
    return players.reduce((boardTileIds: number[], player: Player) => {
        const playedTileIds = Array.from(player.playedTiles.keys());
        
        return boardTileIds.concat(playedTileIds);
    }, []);
}

export const getWinners = (state: PlayersState): Player[] => {
    const { self, opponents } = state;
    
    return opponents.concat(self).filter((person: Player) => person.hasWon);
}

export const getHighestScores = (state: PlayersState): PlayerScore => {
    const { self, opponents } = state;
    const highestScores = new Map();

    CASTES.forEach((caste: Caste) => {
        let highestScore = 0;

        opponents.concat(self).forEach((player: Player) => {
            const score = player.score.get(caste);

            if (score === undefined) {
                return;
            }

            if (score > highestScore) {
                highestScore = score;
            } else if (score === highestScore) {
                highestScore += 1;
            }
        });

        highestScores.set(caste, highestScore);
    });

    return highestScores;
}