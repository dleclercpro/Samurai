import React from 'react';
import './DialogTileChoice.scss';
import Dialog from './Dialog';
import Hand from '../Hand';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import { deselectBoardTile, deselectPlayerTile } from '../../actions/GameActions';
import { DialogType } from '../../types/DialogTypes';
import { AppState } from '../../types/StateTypes';
import { TilePlayStep } from '../../types/GameTypes';
import { playTile } from '../../actions/ServerActions';
import { ThunkDispatch } from 'redux-thunk';

interface StateProps {
    playerTile: number,
    boardTile: number,
    hand: number[],
    isChoosing: boolean,
    hasChosen: boolean,
    isActionButtonActive: boolean,
}

interface DispatchProps {
    deselectBoardTile: () => void,
    deselectPlayerTile: () => void,
    
    playTile: (playerTile: number, boardTile: number) => Promise<any>,
}

type Props = StateProps & DispatchProps;

class DialogTileChoice extends React.Component<Props, {}> {

    handleCancel = () => {
        const { isChoosing, hasChosen, deselectBoardTile, deselectPlayerTile } = this.props;

        hasChosen && deselectPlayerTile() && deselectBoardTile();
        isChoosing && deselectBoardTile();
    }

    handleAction = () => {
        const { playerTile, boardTile, playTile } = this.props;

        return playTile(playerTile, boardTile);
    }

    render() {
        const { hand, isActionButtonActive } = this.props;

        return (
            <Dialog
                type={DialogType.TileChoice}
                headline='Tile Choice'
                message='Choose which tile to place on the empty space you just clicked:'
                actionButtonText='Choose'
                onCancel={this.handleCancel}
                onAction={this.handleAction}
                isActionButtonActive={isActionButtonActive}
                shouldClose
            >
                {hand && <Hand inDialog={DialogType.TileChoice} />}
            </Dialog>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { self } = state.players;
    const { step, selection } = state.game;

    const isChoosing = step === TilePlayStep.ChoosePlayerTile;
    const hasChosen = step === TilePlayStep.Done;
    const isActionButtonActive = step === TilePlayStep.Done;

    return {
        playerTile: selection.play.playerTile,
        boardTile: selection.play.boardTile,
        hand: self.hand,
        isChoosing,
        hasChosen,
        isActionButtonActive,
    }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    deselectBoardTile: () => dispatch(deselectBoardTile),
    deselectPlayerTile: () => dispatch(deselectPlayerTile),
    playTile: (playerTile: number, boardTile: number) => dispatch(playTile(playerTile, boardTile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogTileChoice);