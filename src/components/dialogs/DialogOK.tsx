import React from 'react';
import './DialogOK.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';

interface OwnProps {
    type: DialogType,
    headline: string,
    message: string,
    explanation?: string,
    action?: () => void,
}

type Props = OwnProps;

class DialogOK extends React.Component<Props, {}> {

    render() {
        const { type, headline, message, explanation, action } = this.props;

        return (
            <Dialog
                type={type}
                headline={headline}
                message={message}
                explanation={explanation}
                onAction={action}
                actionButtonText='OK'
                isActionButtonActive
            />
        );
    }
}

export default DialogOK;