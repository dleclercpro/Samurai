import React from 'react';
import './DialogOK.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';

interface OwnProps {
    type: DialogType,
    headline: string,
    message: string,
    explanation?: string,
}

type Props = OwnProps;

class DialogOK extends React.Component<Props, {}> {

    render() {
        const { type, headline, message, explanation } = this.props;

        return (
            <Dialog
                type={type}
                headline={headline}
                message={message}
                explanation={explanation}
                cancelButtonText='OK'
                onAction={() => {}}
                isActionButtonActive
            />
        );
    }
}

export default DialogOK;