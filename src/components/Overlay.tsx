import React, { Dispatch, ReactNode, Component } from 'react';
import './Overlay.scss';
import { AppState } from '../types/StateTypes';
import { AppAction } from '../actions';
import { connect } from 'react-redux';
import { closeDialog } from '../actions/DialogActions';

interface OverlayProps {
    children: ReactNode,
    isOpen: boolean,
    
    closeDialog: () => void,
}

class Overlay extends Component<OverlayProps> {
    
    render() {
        const { children, isOpen, closeDialog } = this.props;

        if (!isOpen) {
            return null;
        }

        return (
            <div className='overlay' onClick={closeDialog}>
                {children}
            </div>
        );
    }
};

const mapStateToProps = (state: AppState) => ({
    isOpen: state.dialog.isOpen,
});

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    closeDialog: () => dispatch(closeDialog),
});

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);