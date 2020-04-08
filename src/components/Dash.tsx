import React from 'react';
import { Player } from '../types/GameTypes';
import './Dash.scss';
import { AppState } from '../types/StateTypes';
import { connect } from 'react-redux';
import PlayerComponent from './PlayerComponent';

interface StateProps {
    player: Player,
    opponents: Player[],
}

type Props = StateProps;

class Dash extends React.Component<Props, {}> {

    render() {
        const { player, opponents } = this.props;
        const { username, score } = player;

        return (
            <section id='dash'>
                <PlayerComponent username={username} score={score} />
                {opponents.map((opponent: Player, index: number) => {
                    const { username, score } = opponent;
                    
                    return (
                        <PlayerComponent
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
    const { player } = state;

    return {
        player: player.self,
        opponents: player.opponents,
    }
};

export default connect(mapStateToProps, () => ({}))(Dash);