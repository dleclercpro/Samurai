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
import { isGameOver } from '../../selectors';

interface OwnProps {
    id: number,
    color: PlayerColor,
    type: TileType,
    strength: number,
    canReplay?: boolean,
    isInDialog?: boolean,
}

interface StateProps {
    step: GameStep,
    isSelected: boolean,
    isPlayable: boolean,
    isMove: boolean,
    isSwap: boolean,
}

interface DispatchProps {
    selectHandTile: (id: number) => void,
    deselectHandTile: () => void,
    openTileMoveStartDialog: () => void,
    openCasteSwapStartDialog: () => void,
}

type Props = OwnProps & StateProps & DispatchProps;

class HandTileComponent extends React.Component<Props, {}> {

    handleClick = (e: React.MouseEvent) => {
        const { id, step, isMove, isSwap, isPlayable, isSelected, selectHandTile, deselectHandTile, openTileMoveStartDialog, openCasteSwapStartDialog } = this.props;
        
        e.stopPropagation();

        if (isPlayable) {
            switch (step) {
                case TilePlayStep.ChooseBoardTile:
                    if (isMove) {
                        openTileMoveStartDialog();
                    } else if (isSwap) {
                        openCasteSwapStartDialog();
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
    const { id, type, isInDialog } = ownProps;
    const { self } = state.players;
    const { step, selection } = state.game;
    const inDialog = isInDialog !== undefined && isInDialog;

    const isMove = type === Action.Move;
    const isSwap = type === Action.Swap;

    // Playability
    let isPlayable = false;
    const isOver = isGameOver(state.players);
    const nPlayedTiles = self.playedTiles.size;

    switch (step) {
        case TilePlayStep.ChooseHandTile:
        case TilePlayStep.Done:
            isPlayable = !isOver && self.isPlaying && inDialog;
            break;
        case TilePlayStep.ChooseBoardTile:
            isPlayable = !isOver && self.isPlaying && !inDialog && ((isMove && nPlayedTiles > 0) || isSwap);
            break;
    }

    const isSelectedForPlay = id === selection.play.handTile;

    return {
        step,
        isPlayable,
        isMove,
        isSwap,
        isSelected: isSelectedForPlay,
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    selectHandTile: (id: number) => dispatch(selectHandTile(id)),
    deselectHandTile: () => dispatch(deselectHandTile),
    openTileMoveStartDialog: () => dispatch(openDialog(DialogType.TileMoveStart)),
    openCasteSwapStartDialog: () => dispatch(openDialog(DialogType.CasteSwapStart)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HandTileComponent);