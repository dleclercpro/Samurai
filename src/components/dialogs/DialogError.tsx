import React from 'react';
import './DialogError.scss';
import { DialogType } from '../../types/DialogTypes';
import DialogOK from './DialogOK';
import { AppState } from '../../types/StateTypes';
import { connect } from 'react-redux';
import i18n from '../../translator';

interface StateProps {
    message: string,
    explanation: string,
    action?: () => Promise<void>,
}

type Props = StateProps;

class DialogError extends React.Component<Props, {}> {

    render() {
        const { message, explanation, action } = this.props;

        return (
            <DialogOK
                type={DialogType.Error}
                headline={i18n.getText('ERROR')}
                message={message}
                explanation={explanation}
                action={action}
            />
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { message, explanation, action } = state.dialog.error;

    return {
        message: message !== undefined ? message : '',
        explanation: explanation !== undefined ? explanation : '',
        action,
    };
};

export default connect(mapStateToProps, () => ({}))(DialogError);