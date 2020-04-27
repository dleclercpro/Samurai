import React from 'react';
import './DialogCasteSwitchEnd.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import { endTurn } from '../../actions/GameActions';
import { AppState, SwitchPartialState } from '../../types/StateTypes';
import { switchCastePieces, refreshGame } from '../../actions/ServerActions';
import { Caste } from '../../types/GameTypes';
import { ThunkDispatch } from 'redux-thunk';

interface StateProps {
    from: SwitchPartialState,
    to: SwitchPartialState,
}

interface DispatchProps {
    endTurn: () => void,
    switchCastePieces: (boardTileFrom: number, boardTileTo: number, casteFrom: Caste, casteTo: Caste) => Promise<void>,
    refreshGame: () => Promise<void>,
}

type Props = StateProps & DispatchProps;

class DialogCasteSwitchEnd extends React.Component<Props, {}> {

    handleCancel = () => {
        const { endTurn } = this.props;

        endTurn();
    }

    handleAction = () => {
        const { from, to, switchCastePieces } = this.props;

        return switchCastePieces(from.tile, to.tile, from.caste, to.caste);
    }

    handleClose = () => {
        const { refreshGame } = this.props;

        refreshGame();
    }

    render() {
        return (
            <Dialog
                type={DialogType.CasteSwitchEnd}
                headline='Caste Switch Confirmation'
                message='Are you sure you want to switch those two caste figures?'
                actionButtonText='Confirm'
                cancelButtonText='Cancel Switch'
                onAction={this.handleAction}
                onCancel={this.handleCancel}
                onClose={this.handleClose}
                isActionButtonActive
                shouldCloseAfterAction
            />
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { selection } = state.game;

    return {
        from: selection.switch.from,
        to: selection.switch.to,
    }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    endTurn: () => dispatch(endTurn),
    switchCastePieces: (boardTileFrom: number, boardTileTo: number, casteFrom: Caste, casteTo: Caste) => dispatch(switchCastePieces(boardTileFrom, boardTileTo, casteFrom, casteTo)),
    refreshGame: () => dispatch(refreshGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogCasteSwitchEnd);