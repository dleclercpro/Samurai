import React, { Dispatch } from 'react';
import './DialogCasteSwapStart.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';
import { AppAction } from '../../actions';
import { startCasteSwap } from '../../actions/GameActions';
import { connect } from 'react-redux';
import i18n from '../../i18n';
import { AppState } from '../../types/StateTypes';

interface StateProps {
    language: i18n,
}

interface DispatchProps {
    startCasteSwap: () => void,
}

type Props = StateProps & DispatchProps

class DialogCasteSwapStart extends React.Component<Props, {}> {

    handleAction = () => {
        const { startCasteSwap } = this.props;

        startCasteSwap();

        return Promise.resolve();
    }

    render() {
        const { language } = this.props;

        return (
            <Dialog
                type={DialogType.CasteSwapStart}
                headline={language.getText('CASTE_SWAP')}
                message={language.getText('CASTE_SWAP_MESSAGE')}
                actionButtonText={language.getText('START_SWAP')}
                onAction={this.handleAction}
                onCancel={() => {}}
                isActionButtonActive
            />
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { language } = state.settings;

    return {
        language,
    };
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    startCasteSwap: () => dispatch(startCasteSwap),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogCasteSwapStart);