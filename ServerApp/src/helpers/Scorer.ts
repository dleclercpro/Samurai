import { CASTES } from '../constants';
import { flatten } from '../libs';
import { IBoardTile } from '../models/BoardTile';
import { IGame } from '../models/Game';
import { IPlayer } from '../models/Player';
import Score, { IScore } from '../models/Score';
import { Caste } from '../types/GameTypes';

export type Scoreboard = Record<string, IScore>;
export type CasteWinners = Record<Caste, IPlayer[]>;



/*
    This class is responsible for computing scores, whether it be the caste winners
    of a city that has just been closed, or the winner of the game.
*/
class Scorer {
    private game: IGame;

    public constructor(game: IGame) {
        this.game = game;
    }

    public generateScoreboard() {
        const players = this.game.getPlayers();

        return players.reduce((scores, player) => ({
            ...scores,
            [player.getId()]: new Score(),

        }), {} as Scoreboard);
    }

    public generateCasteWinners() {
        return CASTES.reduce((castes, caste) => ({
            ...castes,
            [caste]: [],

        }), {} as CasteWinners);
    }

    public updateScoresByCity(city: IBoardTile) {
        const cityScoreboard = this.computeCityScoreboard(city);

        // Strongest player for every caste gets corresponding caste piece(s)
        CASTES.forEach(caste => {
            const strongestPlayers = this.computeStrongestPlayersByCaste(cityScoreboard, caste);

            // Update caste score of strongest player wrt. this caste (it can only be ONE player)
            if (strongestPlayers.length === 1) {
                strongestPlayers[0].increaseScoreByCaste(caste, city.getCastePieceCountByType(caste));
            }
        });
    }

    /*
        The winner of the game is the player who managed to win the most caste types.
    */
    public computeWinners() {
        const winnersByCaste = CASTES.reduce((castes, caste) => {
            return {
                ...castes,
                [caste]: this.computeStrongestPlayersByCaste(this.game.getScoreboard(), caste),
            };

        }, this.generateCasteWinners());

        // Merge all winners by caste together
        const casteWinners = flatten(Object.values(winnersByCaste));

        // Count how many caste types were won for each player
        const players = this.game.getPlayers();
        const wonCasteCounts = players.reduce((prevCounts, player) => {
            return {
                ...prevCounts,
                [player.getId()]: casteWinners.filter(casteWinner => casteWinner.getId() === player.getId()).length,
            };

        }, {} as Record<string, number>);

        // Find out what the highest amount of caste types won was in this game
        const maxCasteCount = Math.max(...Object.values(wonCasteCounts));
        
        // The winners are the ones who won the most cast types
        return players.filter(player => wonCasteCounts[player.getId()] === maxCasteCount);
    }

    /*
        Compute the strength cumulated by every player around a given city.
    */
    private computeCityScoreboard(city: IBoardTile) {
        return city
            .getNeighboringTiles()
            .reduce((scoreboard: Scoreboard, neighboringTile: IBoardTile) => {
                const previouslyPlayedTile = neighboringTile.getPlayedTile();

                if (previouslyPlayedTile) {
                    const player = previouslyPlayedTile.getPlayer();
                    const handTile = previouslyPlayedTile.getHandTile();
        
                    return {
                        ...scoreboard,
                        [player.getId()]: scoreboard[player.getId()].add(handTile.computeScore()),
                    };
                }

                return scoreboard;
    
            }, this.generateScoreboard());
    }

    /*
        Compute which player has cumulated the most strength for a given caste around a given city.
    */
    private computeStrongestPlayersByCaste(scoreboard: Scoreboard, caste: Caste) {
        let strongestPlayers: IPlayer[] = [];
    
        const players = this.game.getPlayers();

        players.forEach(player => {
            if (strongestPlayers.length === 0) {
                strongestPlayers = [player];
                return;
            }

            const score = scoreboard[player.getId()].getByCaste(caste);
            const previousHighScore = scoreboard[strongestPlayers[0].getId()].getByCaste(caste);

            // Current player beat previous high score
            if (score > previousHighScore) {
                strongestPlayers = [player];
                return;
            }

            // Current player matched high score
            if (score === previousHighScore) {
                strongestPlayers = [...strongestPlayers, player];
                return;
            }
        });

        return strongestPlayers;
    }
}

export default Scorer;