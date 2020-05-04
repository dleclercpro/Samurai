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

class DialogOK extends React.Component<Props, {}> {

    render() {
        const { type, headline, message, explanation, action, language } = this.props;

        return (
            <Dialog
                type={type}
                headline={headline}
                message={message}
                explanation={explanation}
                onAction={action !== undefined ? action : () => Promise.resolve()}
                actionButtonText={language.getText('OK')}
                isActionButtonActive
            />
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { language } = state.user;

    return {
        language,
    };
}

export default connect(mapStateToProps, () => ({}))(DialogOK);