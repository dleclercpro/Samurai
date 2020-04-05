import React, { Dispatch, ReactNode } from 'react';
import './Overlay.scss';
import { AppState } from '../types/StateTypes';
import { AppAction } from '../actions';
import { connect } from 'react-redux';
import { closeDialog } from '../actions/DialogActions';

interface OverlayOwnProps {
    children: ReactNode,    
}

interface OverlayStateProps {
    isOpen: boolean,
}

interface OverlayDispatchProps {
    closeDialog: () => void,
}

type OverlayProps = OverlayOwnProps & OverlayStateProps & OverlayDispatchProps;

class Overlay extends React.Component<OverlayProps> {
    
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