import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../types/StateTypes';
import { PlayerColor, TileType, Action, TilePlayStep, GameStep } from '../../types/GameTypes';
import './HandTileComponent.scss';
import { AppAction } from '../../actions';
import { selectPlayerTile, deselectPlayerTile } from '../../actions/GameActions';
import { TILE_SIZE } from '../../config';
import { openDialog } from '../../actions/DialogActions';
import { DialogType } from '../../types/DialogTypes';
import PlayerTileContent from './PlayerTileContent';

interface OwnProps {
    id: number,
    color: PlayerColor,
    type: TileType,
    strength: number,
    canReplay: boolean,
    isInDialog: boolean,
}

interface StateProps {
    step: GameStep,
    isSelected: boolean,
    isPlayable: boolean,
    isMove: boolean,
    isSwitch: boolean,
}

interface DispatchProps {
    selectPlayerTile: (id: number) => void,
    deselectPlayerTile: () => void,
    openTileMoveStartDialog: () => void,
    openCasteSwitchStartDialog: () => void,
}

type Props = OwnProps & StateProps & DispatchProps;

class HandTileComponent extends React.Component<Props, {}> {

    handleClick = (e: React.MouseEvent) => {
        const { id, step, isMove, isSwitch, isPlayable, isSelected, selectPlayerTile, deselectPlayerTile, openTileMoveStartDialog, openCasteSwitchStartDialog } = this.props;
        
        e.stopPropagation();

        if (isPlayable) {
            switch (step) {
                case TilePlayStep.ChooseBoardTile:
                    if (isMove) {
                        openTileMoveStartDialog();
                    } else if (isSwitch) {
                        openCasteSwitchStartDialog();
                    }
                    return;
                case TilePlayStep.ChoosePlayerTile:
                    selectPlayerTile(id);
                    return;
                case TilePlayStep.Done:
                    isSelected ? deselectPlayerTile() : selectPlayerTile(id);
                    return;
            }
        }
    }

    render() {
        const { color, type, strength, isSelected, isPlayable, canReplay } = this.props;
        const { width, height } = TILE_SIZE;

        return (
            <svg
                className='hand-tile-component'
                viewBox={`0 0 ${width} ${height}`}
                onClick={this.handleClick}
            >
                <PlayerTileContent
                    color={color}
                    type={type}
                    strength={strength}
                    canReplay={canReplay}
                    isPlayable={isPlayable}
                    isSelected={isPlayable && isSelected}
                />
            </svg>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => {
    const { isInDialog, id, type } = ownProps;
    const { self } = state.players;
    const { step, selection } = state.game;
    const { play } = selection;
    const nPlayedTiles = self.playedTiles.size;

    const isMove = type === Action.Move;
    const isSwitch = type === Action.Switch;
    const isPlayable = self.isPlaying && (
        (isInDialog && (step === TilePlayStep.ChoosePlayerTile || step === TilePlayStep.Done)) ||
        (isSwitch && step === TilePlayStep.ChooseBoardTile) ||
        (isMove && step === TilePlayStep.ChooseBoardTile && nPlayedTiles > 0)
    );

    const isSelected = id === play.playerTile;    

    return {
        step,
        isPlayable,
        isSelected,
        isMove,
        isSwitch,
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    selectPlayerTile: (id: number) => dispatch(selectPlayerTile(id)),
    deselectPlayerTile: () => dispatch(deselectPlayerTile),
    openTileMoveStartDialog: () => dispatch(openDialog(DialogType.TileMoveStart)),
    openCasteSwitchStartDialog: () => dispatch(openDialog(DialogType.CasteSwitchStart)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HandTileComponent);