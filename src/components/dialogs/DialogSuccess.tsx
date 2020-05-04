import React from 'react';
import './DialogSuccess.scss';
import { DialogType } from '../../types/DialogTypes';
import DialogOK from './DialogOK';
import { AppState } from '../../types/StateTypes';
import { connect } from 'react-redux';
import i18n from '../../translator';

interface StateProps {
    message: string,
    action?: () => Promise<void>,
}

type Props = StateProps;

class DialogSuccess extends React.Component<Props, {}> {

    render() {
        const { message, action } = this.props;

        return (
            <DialogOK
                type={DialogType.Success}
                headline={i18n.getText('SUCCESS')}
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