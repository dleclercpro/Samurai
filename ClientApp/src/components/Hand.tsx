import React from 'react';
import { PlayerColor, HandTile, Figure, Action } from '../types/GameTypes';
import './Hand.scss';
import { AppState } from '../types/StateTypes';
import { connect } from 'react-redux';
import HandTileComponent from './tiles/HandTileComponent';
import { DialogType } from '../types/DialogTypes';

interface OwnProps {
    tiles: HandTile[],
    color: PlayerColor,
    inDialog?: DialogType,
}

interface StateProps {
    isWaterTileSelected?: boolean,
}

type Props = OwnProps & StateProps;

class Hand extends React.Component<Props, {}> {

    getFilteredTilesForDialog = (dialog : DialogType): HandTile[] => {
        const { tiles, isWaterTileSelected } = this.props;

        return tiles.filter((tile: HandTile) => {
            const { type } = tile;

            const isMove = type === Action.Move;
            const isSwap = type === Action.Swap;
            const isShip = type === Figure.Ship;

            switch (dialog) {
                case DialogType.TileChoice:
                    return !isMove && !isSwap && (isWaterTileSelected === isShip);
                default:
                    return false;
            }
        });
    }

    render() {
        const { tiles, color, inDialog } = this.props;

        return (
            <div className='hand'>
                {(inDialog ? this.getFilteredTilesForDialog(inDialog) : tiles).map((tile: HandTile) => {
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
    const { selection } = state.game;
    const { tiles } = state.board;

    return {
        isWaterTileSelected: tiles.get(selection.play.boardTile)?.isWater,
    };
};

export default connect(mapStateToProps)(Hand);