import React, { Dispatch } from 'react';
import './DialogTileChoice.scss';
import Dialog from './Dialog';
import Hand from '../Hand';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import { deselectBoardTile, endTurn, deselectPlayerTile } from '../../actions/GameActions';
import { DialogType } from '../../types/DialogTypes';
import { AppState } from '../../types/StateTypes';
import { TilePlayStep } from '../../types/GameTypes';

interface StateProps {
    isChoosing: boolean,
    hasChosen: boolean,
    isActionButtonActive: boolean,
    hand: number[],
}

interface DispatchProps {
    endTurn: () => void,
    deselectBoardTile: () => void,
    deselectPlayerTile: () => void,
}

type Props = StateProps & DispatchProps;

class DialogTileChoice extends React.Component<Props, {}> {

    handleCancel = () => {
        const { isChoosing, hasChosen, deselectBoardTile, deselectPlayerTile } = this.props;

        hasChosen && deselectPlayerTile() && deselectBoardTile();
        isChoosing && deselectBoardTile();
    }

    handleAction = () => {
        const { endTurn } = this.props;

        alert('Tile choice will now be sent to server.');

        endTurn();
    }

    render() {
        const { hand, isActionButtonActive } = this.props;

        return (
            <Dialog
                type={DialogType.TileChoice}
                headline='Tile Choice'
                message='Choose which tile to place on the empty space you just clicked:'
                actionButtonText='Choose'
                onClose={this.handleCancel}
                onCancel={this.handleCancel}
                onAction={this.handleAction}
                isActionButtonActive={isActionButtonActive}
            >
                {hand && <Hand inDialog={DialogType.TileChoice} />}
            </Dialog>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { game, player } = state;
    const { step } = game;

    const isChoosing = step === TilePlayStep.ChoosePlayerTile;
    const hasChosen = step === TilePlayStep.Done;
    const isActionButtonActive = step === TilePlayStep.Done;

    return {
        isChoosing,
        hasChosen,
        isActionButtonActive,
        hand: player.hand,
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    endTurn: () => dispatch(endTurn),
    deselectBoardTile: () => dispatch(deselectBoardTile),
    deselectPlayerTile: () => dispatch(deselectPlayerTile),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogTileChoice);