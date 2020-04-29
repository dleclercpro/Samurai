import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../types/StateTypes';
import { PlayerColor, TileType, Action, TilePlayStep, GameStep } from '../../types/GameTypes';
import './HandTileComponent.scss';
import { AppAction } from '../../actions';
import { selectHandTile, deselectHandTile } from '../../actions/GameActions';
import { TILE_SIZE } from '../../config';
import { openDialog } from '../../actions/DialogActions';
import { DialogType } from '../../types/DialogTypes';
import HandTileContent from './HandTileContent';

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
    selectHandTile: (id: number) => void,
    deselectHandTile: () => void,
    openTileMoveStartDialog: () => void,
    openCasteSwitchStartDialog: () => void,
}

type Props = OwnProps & StateProps & DispatchProps;

class HandTileComponent extends React.Component<Props, {}> {

    handleClick = (e: React.MouseEvent) => {
        const { id, step, isMove, isSwitch, isPlayable, isSelected, selectHandTile, deselectHandTile, openTileMoveStartDialog, openCasteSwitchStartDialog } = this.props;
        
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
                case TilePlayStep.ChooseHandTile:
                    selectHandTile(id);
                    return;
                case TilePlayStep.Done:
                    isSelected ? deselectHandTile() : selectHandTile(id);
                    return;
            }
        }
    }

    render() {
        const { color, type, strength, isSelected, isPlayable, canReplay } = this.props;
        const { width, height } = TILE_SIZE;

        return (
            <svg
                className={`
                    hand-tile-component
                    ${isSelected ? 'is-selected' : ''}
                `}
                viewBox={`0 0 ${width} ${height}`}
                onClick={this.handleClick}
            >
                <HandTileContent
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

    const isMove = type === Action.Move;
    const isSwitch = type === Action.Switch;

    // Playability
    let isPlayable = false;
    const nPlayedTiles = self.playedTiles.size;

    switch (step) {
        case TilePlayStep.ChooseHandTile:
        case TilePlayStep.Done:
            isPlayable = self.isPlaying && isInDialog;
            break;
        case TilePlayStep.ChooseBoardTile:
            isPlayable = self.isPlaying && !isInDialog && ((isMove && nPlayedTiles > 0) || isSwitch);
            break;
    }

    const isSelectedForPlay = id === selection.play.handTile;

    return {
        step,
        isPlayable,
        isMove,
        isSwitch,
        isSelected: isSelectedForPlay,
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    selectHandTile: (id: number) => dispatch(selectHandTile(id)),
    deselectHandTile: () => dispatch(deselectHandTile),
    openTileMoveStartDialog: () => dispatch(openDialog(DialogType.TileMoveStart)),
    openCasteSwitchStartDialog: () => dispatch(openDialog(DialogType.CasteSwitchStart)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HandTileComponent);