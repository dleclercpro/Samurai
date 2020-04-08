import React, { Dispatch } from 'react';
import './DialogCasteSwitch.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';
import Button from '../Button';
import { AppAction } from '../../actions';
import { startCasteSwitch, endCasteSwitch } from '../../actions/GameActions';
import { connect } from 'react-redux';
import { closeDialog } from '../../actions/DialogActions';

interface DispatchProps {
    closeDialog: () => void,
    startCasteSwitch: () => void,
    endCasteSwitch: () => void,
}

type Props = DispatchProps

class DialogCasteSwitch extends React.Component<Props, {}> {

    doAction = () => {
        const { startCasteSwitch, closeDialog } = this.props;

        startCasteSwitch();
        closeDialog();
    }

    getActionButton = () => {
        return (
            <Button isActive action={this.doAction}>Switch</Button>
        );
    }

    render() {
        return (
            <Dialog
                type={DialogType.CasteSwitch}
                headline='Tile Switch'
                description='Do you want to switch two of your tiles?'
                actionButton={this.getActionButton()}
            >
            </Dialog>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    closeDialog: () => dispatch(closeDialog),
    startCasteSwitch: () => dispatch(startCasteSwitch),
    endCasteSwitch: () => dispatch(endCasteSwitch),
});

export default connect(() => ({}), mapDispatchToProps)(DialogCasteSwitch);