import React from 'react';
import './ScoreBoard.scss';
import { connect } from 'react-redux';
import ScorePlayer from './ScorePlayer';
import { Player, PlayerScore } from '../../types/GameTypes';
import { AppState } from '../../types/StateTypes';
import { getHighestScores, isGameOver } from '../../selectors';

interface StateProps {
    isGameOver: boolean,
    player: Player,
    opponents: Player[],
    highestScores: PlayerScore,
}

type Props = StateProps;

const ScoreBoard: React.FC<Props> = (props) => {
    const { player, opponents, highestScores, isGameOver } = props;
    const { id, username, score, color, isPlaying } = player;
    const hasPlayer = id !== -1;

    return (
        <section
            id='score-board'
            className={`n-players--${opponents.length + 1}`}
        >
            {hasPlayer &&
                <ScorePlayer
                    username={username}
                    color={color}
                    score={score}
                    highestScores={highestScores}
                    isPlaying={isPlaying && !isGameOver}
                />
            }
            {opponents.map((opponent: Player, index: number) => {
                const { id, username, score, color, isPlaying } = opponent;
                const hasPlayer = id !== -1;
                
                return hasPlayer && (
                    <ScorePlayer
                        key={`player-${index}`}
                        username={username}
                        color={color}
                        score={score}
                        highestScores={highestScores}
                        isPlaying={isPlaying && !isGameOver}
                    />
                );
            })}
        </section>
    );
}

const mapStateToProps = (state: AppState) => {
    const { self, opponents } = state.players;

    return {
        isGameOver: isGameOver(state.players),
        player: self,
        opponents: opponents,
        highestScores: getHighestScores(state.players),
    }
};

export default connect(mapStateToProps)(ScoreBoard);