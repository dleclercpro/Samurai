import React, { Dispatch, ReactNode } from 'react';
import './Dialog.scss';
import { ReactComponent as CloseIcon } from '../icons/close.svg';
import { closeDialog } from '../actions/DialogActions';
import { connect } from 'react-redux';
import { AppAction } from '../actions';
import { AppState } from '../types/StateTypes';
import Button from './Button';

interface DialogProps {
    children: ReactNode,
    headline: string,
    
    closeDialog: () => void,
}

class Dialog extends React.Component<DialogProps, {}> {

    render() {
        const { children, headline, closeDialog } = this.props;

        return (
            <div className='dialog'>
                <h2 className='headline'>{headline}</h2>
                <div className='content'>
                    {children}
                </div>
                <div className='buttons'>
                    <Button action={() => {}}>Click me!</Button>
                </div>
                <CloseIcon className='icon-close' onClick={closeDialog} />
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({

});

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    closeDialog: () => dispatch(closeDialog),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);