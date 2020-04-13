import React from 'react';
import './DialogError.scss';
import { DialogType } from '../../types/DialogTypes';
import DialogOK from './DialogOK';
import { AppState } from '../../types/StateTypes';
import { connect } from 'react-redux';

interface OwnProps {
    message: string,
}

type Props = OwnProps;

class DialogError extends React.Component<Props, {}> {

    render() {
        const { message } = this.props;

        return (
            <DialogOK
                type={DialogType.Error}
                headline='Error'
                message={message}
            />
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { message } = state.dialog.error;

    return {
        message: message !== undefined ? message : '',
    };
};

export default connect(mapStateToProps, () => ({}))(DialogError);