import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../types/StateTypes';
import { PlayerColor, TileType, Action, TilePlayStep, GameStep } from '../../types/GameTypes';
import './HandTileComponent.scss';
import { AppAction } from '../../actions';
import { selectPlayerTile, deselectPlayerTile } from '../../actions/GameActions';
import { TILE_SIZE } from '../../config';
import TileComponent from './TileComponent';
import { openDialog } from '../../actions/DialogActions';
import { DialogType } from '../../types/DialogTypes';

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
}

interface DispatchProps {
    selectPlayerTile: (id: number) => void,
    deselectPlayerTile: () => void,
    openCasteSwitchStartDialog: () => void,
}

type Props = OwnProps & StateProps & DispatchProps;

class HandTileComponent extends React.Component<Props, {}> {

    handleClick = (e: React.MouseEvent) => {
        const { id, step, isPlayable, isSelected, selectPlayerTile, deselectPlayerTile, openCasteSwitchStartDialog } = this.props;
        
        e.stopPropagation();

        if (isPlayable) {
            switch (step) {

                // Switch tile
                case TilePlayStep.ChooseBoardTile:
                    openCasteSwitchStartDialog();
                    return;
                
                // In tile choice dialog
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
                <TileComponent
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
    const { step, selection } = state.game;
    const { play } = selection;
    const { isInDialog, id, type } = ownProps;

    const isSwitch = type === Action.Switch;
    const isSelected = id === play.playerTile;    
    const isPlayable =
        (isInDialog && (step === TilePlayStep.ChoosePlayerTile || step === TilePlayStep.Done)) ||
        (isSwitch && step === TilePlayStep.ChooseBoardTile);

    return {
        step,
        isSelected,
        isPlayable,
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    selectPlayerTile: (id: number) => dispatch(selectPlayerTile(id)),
    deselectPlayerTile: () => dispatch(deselectPlayerTile),
    openCasteSwitchStartDialog: () => dispatch(openDialog(DialogType.CasteSwitchStart)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HandTileComponent);