import React from 'react';
import { PlayerColor, PlayerTile } from '../types/GameTypes';
import './Hand.scss';
import PlayerTileComponent from './PlayerTileComponent';
import { AppState } from '../types/StateTypes';
import { connect } from 'react-redux';

interface StateProps {
    hand: PlayerTile[],
    color: PlayerColor,
}

type Props = StateProps;

class Hand extends React.Component<Props, {}> {

    render() {
        const { hand, color } = this.props;
    
        return hand.map((tile: PlayerTile, index: number) => {
            const { id, type, strength, canReplay } = tile;
            
            return (
                <PlayerTileComponent
                    key={index}
                    id={id}
                    color={color}
                    type={type}
                    strength={strength}
                    canReplay={canReplay}
                />
            );
        });
    }
}

const mapStateToProps = (state: AppState) => ({
    hand: state.player.hand,
    color: state.player.color,
});

export default connect(mapStateToProps, () => ({}))(Hand);