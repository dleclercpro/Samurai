import React, { Dispatch } from 'react';
import './DialogCasteSwapStart.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';
import { AppAction } from '../../actions';
import { startCasteSwap } from '../../actions/GameActions';
import { connect } from 'react-redux';

interface DispatchProps {
    startCasteSwap: () => void,
}

type Props = DispatchProps

class DialogCasteSwapStart extends React.Component<Props, {}> {

    handleAction = () => {
        const { startCasteSwap } = this.props;

        startCasteSwap();

        return Promise.resolve();
    }

    render() {
        return (
            <Dialog
                type={DialogType.CasteSwapStart}
                headline='Caste Swap'
                message='Do you want to swap two caste figures from two different cities?'
                actionButtonText='Start Swap'
                onAction={this.handleAction}
                onCancel={() => {}}
                isActionButtonActive
            />
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    startCasteSwap: () => dispatch(startCasteSwap),
});

export default connect(() => ({}), mapDispatchToProps)(DialogCasteSwapStart);