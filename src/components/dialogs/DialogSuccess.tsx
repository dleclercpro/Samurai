import React from 'react';
import './DialogSuccess.scss';
import { DialogType } from '../../types/DialogTypes';
import DialogOK from './DialogOK';
import { AppState } from '../../types/StateTypes';
import { connect } from 'react-redux';

interface StateProps {
    message: string,
    action?: () => void,
}

type Props = StateProps;

class DialogSuccess extends React.Component<Props, {}> {

    render() {
        const { message, action } = this.props;

        return (
            <DialogOK
                type={DialogType.Success}
                headline='Success'
                message={message}
                action={action}
            />
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { message, action } = state.dialog.success;

    return {
        message: message !== undefined ? message : '',
        action,
    };
};

export default connect(mapStateToProps, () => ({}))(DialogSuccess);