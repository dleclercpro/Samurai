import React from 'react';
import './Grid.scss';
import Board from './Board';
import Hand from './Hand';
import ScoreBoard from './scores/ScoreBoard';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import { HandTile } from '../types/GameTypes';
import { getHandTiles } from '../selectors';

interface StateProps {
    tiles: HandTile[],
}

type Props = StateProps;

class Grid extends React.Component<Props, {}> {
    
    render() {
        const { tiles } = this.props;

        return (
            <div id='grid'>
                <section id='top'>
                </section>
                <section id='center'>
                    <Board />
                </section>
                <section id='bottom'>
                    <Hand tiles={tiles} />
                    <ScoreBoard />
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        tiles: getHandTiles(state),
    };
};

export default connect(mapStateToProps, () => ({}))(Grid);