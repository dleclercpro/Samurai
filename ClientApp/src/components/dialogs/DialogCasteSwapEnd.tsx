import React from 'react';
import './DialogCasteSwapEnd.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import { endTurn } from '../../actions/GameActions';
import { AppState, SwapPartialState } from '../../types/StateTypes';
import { swapCastePieces } from '../../actions/ServerActions';
import { Caste } from '../../types/GameTypes';
import { ThunkDispatch } from 'redux-thunk';
import i18n from '../../i18n';

interface StateProps {
    from: SwapPartialState,
    to: SwapPartialState,
    language: i18n,
}

interface DispatchProps {
    endTurn: () => void,
    swapCastePieces: (boardTileFrom: number, boardTileTo: number, casteFrom: Caste, casteTo: Caste) => Promise<void>,
}

type Props = StateProps & DispatchProps;

class DialogCasteSwapEnd extends React.Component<Props, {}> {

    handleCancel = () => {
        const { endTurn } = this.props;

        endTurn();
    }

    handleAction = () => {
        const { from, to, swapCastePieces } = this.props;

        return swapCastePieces(from.tile, to.tile, from.caste, to.caste);
    }

    render() {
        const { language } = this.props;

        return (
            <Dialog
                type={DialogType.CasteSwapEnd}
                headline={language.getText('CASTE_SWAP_CONFIRMATION')}
                message={language.getText('CASTE_SWAP_CONFIRMATION_MESSAGE')}
                actionButtonText={language.getText('CONFIRM')}
                cancelButtonText={language.getText('CANCEL_SWAP')}
                onAction={this.handleAction}
                onCancel={this.handleCancel}
                isActionButtonActive
            />
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { selection } = state.game;
    const { language } = state.settings;

    return {
        from: selection.swap.from,
        to: selection.swap.to,
        language,
    }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    endTurn: () => dispatch(endTurn),
    swapCastePieces: (boardTileFrom: number, boardTileTo: number, casteFrom: Caste, casteTo: Caste) => dispatch(swapCastePieces(boardTileFrom, boardTileTo, casteFrom, casteTo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogCasteSwapEnd);