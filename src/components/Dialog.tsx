import React, { Dispatch, ReactNode } from 'react';
import './Dialog.scss';
import { closeDialog } from '../actions/DialogActions';
import { connect } from 'react-redux';
import { AppAction } from '../actions';
import Button from './Button';
import { ReactComponent as CloseIcon } from '../icons/close.svg';
import { AppState } from '../types/StateTypes';

interface OwnProps {
    children: ReactNode,
    type: string,
    headline: string,
    onClose: () => void,
}

interface StateProps {
    isOpen: boolean,
}

interface DispatchProps {
    closeDialog: () => void,
}

type Props = OwnProps & StateProps & DispatchProps;

class Dialog extends React.Component<Props, {}> {

    handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    }

    handleClose = () => {
        const { onClose, closeDialog } = this.props;

        onClose();
        closeDialog();
    }

    render() {
        const { children, type, headline, closeDialog, isOpen } = this.props;

        if (!isOpen) {
            return null;
        }

        return (
            <div className='dialog-overlay' onClick={this.handleClose}>
                <div className={`dialog ${type ? `dialog--${type}` : ''}`} onClick={this.handleClick}>
                    <h2 className='headline'>{headline}</h2>
                    <div className='content'>
                        {children}
                    </div>
                    <div className='buttons'>
                        <Button action={closeDialog}>Cancel</Button>
                        <Button action={closeDialog}>OK</Button>
                    </div>
                    <CloseIcon className='icon-close' onClick={this.handleClose} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    isOpen: state.dialog.isOpen,
});

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    closeDialog: () => dispatch(closeDialog),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);