import React, { Dispatch } from 'react';
import './DialogCasteSwitchConfirm.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';
import Button from '../Button';
import { AppState } from '../../types/StateTypes';
import { PlayerColor } from '../../types/GameTypes';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import { endCasteSwitch } from '../../actions/GameActions';
import { closeDialog } from '../../actions/DialogActions';

interface StateProps {
    color: PlayerColor,
}

interface DispatchProps {
    closeDialog: () => void,
    endCasteSwitch: () => void,
}

type Props = StateProps & DispatchProps;

class DialogCasteSwitchConfirm extends React.Component<Props, {}> {

    cancelAction = () => {
        const { endCasteSwitch, closeDialog } = this.props;

        endCasteSwitch();
        closeDialog();
    }

    doAction = () => {
        const { closeDialog } = this.props;

        closeDialog();
    }

    getActionButton = () => {
        return (
            <Button isActive action={this.doAction}>Confirm</Button>
        );
    }

    render() {
        return (
            <Dialog
                type={DialogType.CasteSwitchConfirm}
                headline='Tile Switch'
                description='Are you sure you want to switch those two tiles?'
                onClose={this.cancelAction}
                cancelButtonText='Cancel Switch'
                actionButton={this.getActionButton()}
            >
            </Dialog>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { game } = state;

    return {
        switch: game.casteSwitch,
        color: game.player.color,
    };
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    closeDialog: () => dispatch(closeDialog),
    endCasteSwitch: () => dispatch(endCasteSwitch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogCasteSwitchConfirm);