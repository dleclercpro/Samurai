import React from 'react';
import { PlayerColor, PlayerTile, Figure } from '../types/GameTypes';
import './Hand.scss';
import PlayerTileComponent from './PlayerTileComponent';
import { AppState } from '../types/StateTypes';
import { connect } from 'react-redux';

interface OwnProps {
    isPlayable: boolean,
}

interface StateProps {
    hand: PlayerTile[],
    color: PlayerColor,
    isWaterTileSelected?: boolean,
}

type Props = OwnProps & StateProps;

class Hand extends React.Component<Props, {}> {

    filter = (hand: PlayerTile[]): PlayerTile[] => {
        const { isPlayable, isWaterTileSelected } = this.props;
        let tiles: PlayerTile[] = [];

        if (isPlayable) {
            tiles = hand.filter((tile: PlayerTile) => {
                const isShip = tile.type === Figure.Ship;
    
                return (isWaterTileSelected && isShip) || (!isWaterTileSelected && !isShip);
            });
        }

        return tiles;
    }

    render() {
        const { hand, color, isPlayable } = this.props;
        const tiles = isPlayable ? this.filter(hand) : hand;

        return (
            <div className='hand'>
                {tiles.map((tile: PlayerTile) => {
                    const { id, type, strength, canReplay } = tile;
                    
                    return (
                        <PlayerTileComponent
                            key={`player-tile-component-${id}`}
                            id={id}
                            color={color}
                            type={type}
                            strength={strength}
                            canReplay={canReplay}
                            isPlayable={isPlayable}
                        />
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    hand: state.player.hand,
    color: state.player.self.color,
    isWaterTileSelected: state.board.tiles.get(state.board.selectedTileID)?.isWater,
});

export default connect(mapStateToProps, () => ({}))(Hand);