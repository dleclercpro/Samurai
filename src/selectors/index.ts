import { AppState, PlayersState } from '../types/StateTypes';
import { Player, HandTile, PlayerScore, Caste } from '../types/GameTypes';
import { notUndefined } from '../types/FunctionTypes';
import { CASTES } from '../constants';
import { hasMultiple } from '../lib';

export const getHandTiles = (state: AppState): HandTile[] => {
    const { data, players } = state;
    const { self } = players;

    return self.hand.map((id: number) => (
        data.fullHand.get(id)
    )).filter(notUndefined);
}

export const getTakenBoardTileIds = (state: PlayersState): number[] => {
    const players = getAllPlayers(state);
    
    return players.reduce((boardTileIds: number[], player: Player) => {
        const playedTileIds = Array.from(player.playedTiles.keys());
        
        return boardTileIds.concat(playedTileIds);
    }, []);
}

export const getPlayedTileIdsByPlayerId = (state: PlayersState, id: number): number[] => {
    const players = getAllPlayers(state);

    return players.reduce((tileIds: number[], player: Player) => {
        if (player.id === id) {
            return tileIds.concat(Array.from(player.playedTiles.values()));
        }

        return tileIds;
    }, []);
}

export const getAllPlayers = (state: PlayersState): Player[] => {
    const { self, opponents } = state;
    
    return opponents.concat(self);
}

export const getCurrentPlayer = (state: PlayersState): Player => {
    return getAllPlayers(state).filter((person: Player) => person.isPlaying)[0];
}

export const getWinners = (state: PlayersState): Player[] => {
    const players = getAllPlayers(state);
    
    return players.filter((person: Player) => person.hasWon);
}

export const getHighestScores = (state: PlayersState): PlayerScore => {
    const players = getAllPlayers(state);
    const highestScores = new Map();

    CASTES.forEach((caste: Caste) => {
        const scores = players.map(player => player.score.get(caste)).filter(notUndefined);
        let highestScore = Math.max(...scores);

        // If multiple players have the same max score, then they
        // are not considered as having the highest one
        if (hasMultiple(highestScore, scores)) {
            highestScore += 1;
        }

        highestScores.set(caste, highestScore);
    });

    return highestScores;
}