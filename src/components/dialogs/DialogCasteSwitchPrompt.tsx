import React, { Dispatch } from 'react';
import './DialogCasteSwitchPrompt.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';
import { AppAction } from '../../actions';
import { startCasteSwitch, endCasteSwitch } from '../../actions/GameActions';
import { connect } from 'react-redux';

interface DispatchProps {
    startCasteSwitch: () => void,
    endCasteSwitch: () => void,
}

type Props = DispatchProps

class DialogCasteSwitchPrompt extends React.Component<Props, {}> {

    render() {
        const { startCasteSwitch, endCasteSwitch } = this.props;

        return (
            <Dialog
                type={DialogType.CasteSwitchPrompt}
                headline='Caste Switch'
                description='Do you want to switch two caste figures from two different cities?'
                actionButtonText='Switch'
                onAction={startCasteSwitch}
                onCancel={endCasteSwitch}
                isActionButtonActive
            >
            </Dialog>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    startCasteSwitch: () => dispatch(startCasteSwitch),
    endCasteSwitch: () => dispatch(endCasteSwitch),
});

export default connect(() => ({}), mapDispatchToProps)(DialogCasteSwitchPrompt);