import React from 'react';
import './DialogOK.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';
import i18n from '../../i18n';
import { AppState } from '../../types/StateTypes';
import { connect } from 'react-redux';

interface OwnProps {
    type: DialogType,
    headline: string,
    message: string,
    explanation?: string,
    action?: () => Promise<void>,
}

interface StateProps {
    language: i18n,
}

type Props = OwnProps & StateProps;

const DialogOK: React.FC<Props> = (props) => {
    const { type, headline, message, explanation, action, language } = props;

    return (
        <Dialog
            type={type}
            classes={[DialogType.OK]}
            headline={headline}
            message={message}
            explanation={explanation}
            onAction={action}
            actionButtonText={language.getText('OK')}
            isActionButtonActive
        />
    );
}

const mapStateToProps = (state: AppState) => {
    const { language } = state.settings;

    return {
        language,
    };
}

export default connect(mapStateToProps)(DialogOK);