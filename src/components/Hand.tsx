import React from 'react';
import { PlayerColor, PlayerTile, Figure, Action } from '../types/GameTypes';
import './Hand.scss';
import { AppState } from '../types/StateTypes';
import { connect } from 'react-redux';
import HandTileComponent from './tiles/HandTileComponent';
import { DialogType } from '../types/DialogTypes';

interface OwnProps {
    tiles: PlayerTile[],
    inDialog?: DialogType,
}

interface StateProps {
    color: PlayerColor,
    isWaterTileSelected?: boolean,
}

type Props = OwnProps & StateProps;

class Hand extends React.Component<Props, {}> {

    getFilteredTilesForDialog = (dialog : DialogType): PlayerTile[] => {
        const { tiles, isWaterTileSelected } = this.props;

        return tiles.filter((tile: PlayerTile) => {
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
        const { tiles, color, inDialog } = this.props;

        return (
            <div className='hand'>
                {(inDialog ? this.getFilteredTilesForDialog(inDialog) : tiles).map((tile: PlayerTile) => {
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
    const { tiles } = state.data;
    const { play } = selection;

    return {
        color: self.color,
        isWaterTileSelected: tiles.get(play.boardTile)?.isWater,
    };
};

export default connect(mapStateToProps, () => ({}))(Hand);