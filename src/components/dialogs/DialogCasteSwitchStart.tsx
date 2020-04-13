import React, { Dispatch } from 'react';
import './DialogCasteSwitchStart.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';
import { AppAction } from '../../actions';
import { startCasteSwitch } from '../../actions/GameActions';
import { connect } from 'react-redux';

interface DispatchProps {
    startCasteSwitch: () => void,
}

type Props = DispatchProps

class DialogCasteSwitchStart extends React.Component<Props, {}> {

    render() {
        const { startCasteSwitch } = this.props;

        return (
            <Dialog
                type={DialogType.CasteSwitchStart}
                headline='Caste Switch'
                message='Do you want to switch two caste figures from two different cities?'
                actionButtonText='Start Switch'
                onAction={startCasteSwitch}
                isActionButtonActive
            />
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    startCasteSwitch: () => dispatch(startCasteSwitch),
});

export default connect(() => ({}), mapDispatchToProps)(DialogCasteSwitchStart);