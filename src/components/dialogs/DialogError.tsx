import React from 'react';
import './DialogError.scss';
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

const DialogError: React.FC<Props> = (props) => {
    const { message, explanation, action, language } = props;

    return (
        <DialogOK
            type={DialogType.Error}
            headline={language.getText('ERROR')}
            message={message}
            explanation={explanation}
            action={action}
        />
    );
}

const mapStateToProps = (state: AppState) => {
    const { message, explanation, action } = state.dialog.error;
    const { language } = state.settings;

    return {
        message: message !== undefined ? message : '',
        explanation: explanation !== undefined ? explanation : '',
        action,
        language,
    };
};

export default connect(mapStateToProps)(DialogError);