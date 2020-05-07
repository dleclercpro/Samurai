import React from 'react';
import './Grid.scss';
import Board from './Board';
import Hand from './Hand';
import ScoreBoard from './scores/ScoreBoard';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import { HandTile, PlayerColor } from '../types/GameTypes';
import { getHandTiles } from '../selectors';

interface StateProps {
    name: string,
    hand: HandTile[],
    color: PlayerColor,
}

type Props = StateProps;

class Grid extends React.Component<Props, {}> {
    
    render() {
        const { name, hand, color } = this.props;

        return (
            <div id='grid'>
                <section id='top'>
                    <p className='game-name'>{name}</p>
                </section>
                <section id='center'>
                    <Board />
                </section>
                <section id='bottom'>
                    <Hand
                        tiles={hand}
                        color={color}
                    />
                    <ScoreBoard />
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { name } = state.game;
    const { self } = state.players;

    return {
        hand: getHandTiles(state),
        color: self.color,
        name,
    };
};

export default connect(mapStateToProps, () => ({}))(Grid);