import React from 'react';
import { PlayerColor, PlayerTile, Figure, Action } from '../types/GameTypes';
import './Hand.scss';
import { AppState } from '../types/StateTypes';
import { connect } from 'react-redux';
import HandTileComponent from './tiles/HandTileComponent';
import { notUndefined } from '../types/FunctionTypes';
import { DialogType } from '../types/DialogTypes';

interface OwnProps {
    inDialog?: DialogType,
}

interface StateProps {
    hand: PlayerTile[],
    color: PlayerColor,
    isWaterTileSelected?: boolean,
}

type Props = OwnProps & StateProps;

class Hand extends React.Component<Props, {}> {

    getFilteredForDialog = (dialog : DialogType): PlayerTile[] => {
        const { hand, isWaterTileSelected } = this.props;

        return hand.filter((tile: PlayerTile) => {
            const { type } = tile;

            const isMove = type === Action.Move;
            const isSwitch = type === Action.Switch;
            const isShip = type === Figure.Ship;

            switch (dialog) {
                case DialogType.TileChoice:
                    return !isMove && !isSwitch && (isWaterTileSelected === isShip);
                default:
                    return false;
        }
        });
    }

    render() {
        const { hand, color, inDialog } = this.props;
        const tiles = inDialog ? this.getFilteredForDialog(inDialog) : hand;

        return (
            <div className='hand'>
                {tiles.map((tile: PlayerTile) => {
                    const { id, type, strength, canReplay } = tile;

                    return (
                        <HandTileComponent
                            key={`hand-tile-component-${id}-${color}`}
                            id={id}
                            color={color}
                            type={type}
                            strength={strength}
                            canReplay={canReplay}
                            isInDialog={inDialog !== undefined}
                        />
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { self } = state.players;
    const { selection } = state.game;
    const { initHand, tiles } = state.data;
    const { play } = selection;

    return {
        hand: self.hand.map((id: number) => initHand.get(id)).filter(notUndefined),
        color: self.color,
        isWaterTileSelected: tiles.get(play.boardTile)?.isWater,
    };
};

export default connect(mapStateToProps, () => ({}))(Hand);