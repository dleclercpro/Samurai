import React from 'react';
import './DialogOK.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';

interface OwnProps {
    type: DialogType,
    headline: string,
    message: string,
}

type Props = OwnProps;

class DialogOK extends React.Component<Props, {}> {

    render() {
        const { type, headline, message } = this.props;

        return (
            <Dialog
                type={type}
                headline={headline}
                message={message}
                cancelButtonText='OK'
                onCancel={() => {}}
            />
        );
    }
}

export default DialogOK;