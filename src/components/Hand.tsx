import React from 'react';
import { PlayerColor, PlayerTile, Figure, Action } from '../types/GameTypes';
import './Hand.scss';
import { AppState } from '../types/StateTypes';
import { connect } from 'react-redux';
import HandTileComponent from './HandTileComponent';

interface OwnProps {
    isInDialog: boolean,
}

interface StateProps {
    hand: PlayerTile[],
    color: PlayerColor,
    isWaterTileSelected?: boolean,
}

type Props = OwnProps & StateProps;

class Hand extends React.Component<Props, {}> {

    getFilteredForDialog = (): PlayerTile[] => {
        const { hand, isWaterTileSelected } = this.props;

        return hand.filter((tile: PlayerTile) => {
            const isSwitch = tile.type === Action.Switch;
            const isShip = tile.type === Figure.Ship;

            return !isSwitch && ((isWaterTileSelected && isShip) || (!isWaterTileSelected && !isShip));
        });
    }

    render() {
        const { hand, color, isInDialog } = this.props;
        const tiles = isInDialog ? this.getFilteredForDialog() : hand;

        return (
            <div className='hand'>
                {tiles.map((tile: PlayerTile) => {
                    const { id, type, strength, canReplay } = tile;
                    const isSwitch = type === Action.Switch;
                    const isPlayable = isInDialog || isSwitch;

                    return (
                        <HandTileComponent
                            key={`hand-tile-component-${id}`}
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
    hand: state.game.hand,
    color: state.game.player.color,
    isWaterTileSelected: state.board.tiles.get(state.board.selectedTileID)?.isWater,
});

export default connect(mapStateToProps, () => ({}))(Hand);