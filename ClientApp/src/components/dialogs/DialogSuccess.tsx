import React from 'react';
import './DialogSuccess.scss';
import { DialogType } from '../../types/DialogTypes';
import DialogOK from './DialogOK';
import { AppState } from '../../types/StateTypes';
import { connect } from 'react-redux';
import i18n from '../../i18n';

interface StateProps {
    message: string,
    explanation?: string,
    action?: () => Promise<void>,
    language: i18n,
}

type Props = StateProps;

const DialogSuccess: React.FC<Props> = (props) => {
    const { message, explanation, action, language } = props;

    return (
        <DialogOK
            type={DialogType.Success}
            headline={language.getText('SUCCESS')}
            message={message}
            explanation={explanation}
            action={action}
        />
    );
}

const mapStateToProps = (state: AppState) => {
    const { message, explanation, action } = state.dialog.success;
    const { language } = state.settings;

    return {
        message: message !== undefined ? message : '',
        explanation: explanation !== undefined ? explanation : '',
        action,
        language,
    };
};

export default connect(mapStateToProps)(DialogSuccess);