import React from 'react';
import { PlayerColor, PlayerTile, Figure, Action } from '../types/GameTypes';
import './Hand.scss';
import { AppState } from '../types/StateTypes';
import { connect } from 'react-redux';
import HandTileComponent from './tiles/HandTileComponent';
import { notUndefined } from '../types/FunctionTypes';

interface OwnProps {
    inDialog: boolean,
}

interface StateProps {
    hand: PlayerTile[],
    color: PlayerColor,
    isWaterTileSelected?: boolean,
    isSwitching: boolean,
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
        const { hand, color, inDialog, isSwitching } = this.props;
        const tiles = inDialog ? this.getFilteredForDialog() : hand;

        return (
            <div className='hand'>
                {tiles.map((tile: PlayerTile) => {
                    const { id, type, strength, canReplay } = tile;
                    const isSwitch = type === Action.Switch;
                    const isPlayable = inDialog || (isSwitch && !isSwitching);

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

const mapStateToProps = (state: AppState) => {
    const { game, board } = state;
    const { initHand, isSwitching } = game;
    const hand = game.hand.map((id: number) => initHand.get(id)).filter(notUndefined);

    return {
        hand,
        color: game.player.color,
        isWaterTileSelected: board.tiles.get(board.selectedTileForNextPlayerTile)?.isWater,
        isSwitching,
    };
};

export default connect(mapStateToProps, () => ({}))(Hand);