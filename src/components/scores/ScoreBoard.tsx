import React from 'react';
import './ScoreBoard.scss';
import { connect } from 'react-redux';
import ScorePlayer from './ScorePlayer';
import { Player } from '../../types/GameTypes';
import { AppState } from '../../types/StateTypes';

interface StateProps {
    player: Player,
    opponents: Player[],
}

type Props = StateProps;

class ScoreBoard extends React.Component<Props, {}> {

    render() {
        const { player, opponents } = this.props;
        const { username, score } = player;

        return (
            <section id='score-board'>
                <ScorePlayer username={username} score={score} />
                {opponents.map((opponent: Player, index: number) => {
                    const { username, score } = opponent;
                    
                    return (
                        <ScorePlayer
                            key={`player-${index}`}
                            username={username}
                            score={score}
                        />
                    );
                })}
            </section>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { self, opponents } = state.player;

    return {
        player: self,
        opponents: opponents,
    }
};

export default connect(mapStateToProps, () => ({}))(ScoreBoard);