import React from 'react';
import './ScoreBoard.scss';
import { connect } from 'react-redux';
import ScorePlayer from './ScorePlayer';
import { Player, PlayerScore } from '../../types/GameTypes';
import { AppState } from '../../types/StateTypes';
import { getHighestScores } from '../../selectors';

interface StateProps {
    player: Player,
    opponents: Player[],
    highestScores: PlayerScore,
}

type Props = StateProps;

class ScoreBoard extends React.Component<Props, {}> {

    render() {
        const { player, opponents, highestScores } = this.props;
        const { id, username, score, color, isPlaying } = player;
        const hasPlayer = id !== -1;

        return (
            <section id='score-board'>
                {hasPlayer &&
                    <ScorePlayer
                        username={username}
                        color={color}
                        score={score}
                        highestScores={highestScores}
                        isPlaying={isPlaying}
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
                            isPlaying={isPlaying}
                        />
                    );
                })}
            </section>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { self, opponents } = state.players;

    return {
        player: self,
        opponents: opponents,
        highestScores: getHighestScores(state.players),
    }
};

export default connect(mapStateToProps, () => ({}))(ScoreBoard);