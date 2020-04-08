import React, { Dispatch } from 'react';
import './DialogCasteSwitchConfirm.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import { endCasteSwitch } from '../../actions/GameActions';

interface DispatchProps {
    endCasteSwitch: () => void,
}

type Props = DispatchProps;

class DialogCasteSwitchConfirm extends React.Component<Props, {}> {

    render() {
        const { endCasteSwitch } = this.props;

        return (
            <Dialog
                type={DialogType.CasteSwitchConfirm}
                headline='Caste Switch'
                description='Are you sure you want to switch those two caste figures?'
                actionButtonText='Confirm'
                cancelButtonText='Cancel Switch'
                onAction={() => {}}
                onCancel={endCasteSwitch}
                isActionButtonActive
            >
            </Dialog>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    endCasteSwitch: () => dispatch(endCasteSwitch),
});

export default connect(() => ({}), mapDispatchToProps)(DialogCasteSwitchConfirm);