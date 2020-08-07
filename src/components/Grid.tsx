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
    hand: HandTile[],
    color: PlayerColor,
}

type Props = StateProps;

const Grid: React.FC<Props> = (props) => {    
    const { hand, color } = props;

    return (
        <div id='grid'>
            <section id='top'>
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

const mapStateToProps = (state: AppState) => {
    const { self } = state.players;

    return {
        hand: getHandTiles(state),
        color: self.color,
    };
};

export default connect(mapStateToProps)(Grid);