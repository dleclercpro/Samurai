import React, { Dispatch, ReactNode } from 'react';
import './Dialog.scss';
import { closeDialog } from '../actions/DialogActions';
import { connect } from 'react-redux';
import { AppAction } from '../actions';
import Button from './Button';
import { ReactComponent as CloseIcon } from '../icons/close.svg';

interface DialogOwnProps {
    children: ReactNode,
    type: string,
    headline: string,
}

interface DialogDispatchProps {
    closeDialog: () => void,
}

type DialogProps = DialogOwnProps & DialogDispatchProps;

class Dialog extends React.Component<DialogProps, {}> {

    handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    }

    render() {
        const { children, type, headline, closeDialog } = this.props;

        return (
            <div className={`dialog ${type ? `dialog--${type}` : ''}`} onClick={this.handleClick}>
                <h2 className='headline'>{headline}</h2>
                <div className='content'>
                    {children}
                </div>
                <div className='buttons'>
                    <Button action={closeDialog}>Cancel</Button>
                    <Button action={closeDialog}>OK</Button>
                </div>
                <CloseIcon className='icon-close' onClick={closeDialog} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    closeDialog: () => dispatch(closeDialog),
});

export default connect(() => ({}), mapDispatchToProps)(Dialog);