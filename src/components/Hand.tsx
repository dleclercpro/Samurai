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
    selectedTileForMove: number,
    isWaterTileSelected?: boolean,
}

type Props = OwnProps & StateProps;

class Hand extends React.Component<Props, {}> {

    getFilteredForDialog = (dialog : DialogType): PlayerTile[] => {
        const { hand, selectedTileForMove, isWaterTileSelected } = this.props;

        return hand.filter((tile: PlayerTile) => {
            const { id, type } = tile;

            const isSwitch = type === Action.Switch;
            const isShip = type === Figure.Ship;
            const isSelectedForMove = selectedTileForMove !== -1 && id === selectedTileForMove;

            switch (dialog) {
                case DialogType.TileChoice:
                    return !isSwitch && (isWaterTileSelected === isShip);
                case DialogType.TileMoveEnd:
                    return isSelectedForMove;
            }

            return false;
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
                            key={`hand-tile-component-${id}`}
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
    const { game, data, player } = state;
    const { selection } = game;
    const { initHand, tiles } = data;
    const { self, hand } = player;
    const { play, move } = selection;

    return {
        hand: hand.map((id: number) => initHand.get(id)).filter(notUndefined),
        color: self.color,
        isWaterTileSelected: tiles.get(play.boardTile)?.isWater,
        selectedTileForMove: move.from,
    };
};

export default connect(mapStateToProps, () => ({}))(Hand);