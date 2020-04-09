import React, { Dispatch } from 'react';
import './DialogCasteSwitchEnd.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import { endTurn } from '../../actions/GameActions';

interface DispatchProps {
    endTurn: () => void,
}

type Props = DispatchProps;

class DialogCasteSwitchEnd extends React.Component<Props, {}> {

    handleCancel = () => {
        const { endTurn } = this.props;

        alert('Caste switch was canceled altogether.');

        endTurn();
    }

    handleAction = () => {
        const { endTurn } = this.props;

        alert('Caste switch will now be sent to server.');
        
        endTurn();
    }

    render() {
        return (
            <Dialog
                type={DialogType.CasteSwitchEnd}
                headline='Caste Switch Confirmation'
                description='Are you sure you want to switch those two caste figures?'
                actionButtonText='Confirm'
                cancelButtonText='Cancel Switch'
                onAction={this.handleAction}
                onCancel={this.handleCancel}
                isActionButtonActive
            />
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    endTurn: () => dispatch(endTurn),
});

export default connect(() => ({}), mapDispatchToProps)(DialogCasteSwitchEnd);