import React from 'react';
import './DialogSuccess.scss';
import { DialogType } from '../../types/DialogTypes';
import DialogOK from './DialogOK';
import { AppState } from '../../types/StateTypes';
import { connect } from 'react-redux';
import i18n from '../../i18n';

interface StateProps {
    message: string,
    action?: () => Promise<void>,
    language: i18n,
}

type Props = StateProps;

class DialogSuccess extends React.Component<Props, {}> {

    render() {
        const { message, action, language } = this.props;

        return (
            <DialogOK
                type={DialogType.Success}
                headline={language.getText('SUCCESS')}
                message={message}
                action={action}
            />
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { message, action } = state.dialog.success;
    const { language } = state.user;

    return {
        message: message !== undefined ? message : '',
        action,
        language,
    };
};

export default connect(mapStateToProps, () => ({}))(DialogSuccess);