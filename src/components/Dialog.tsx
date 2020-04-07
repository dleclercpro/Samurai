import React, { Dispatch, ReactNode } from 'react';
import './Dialog.scss';
import { closeDialog } from '../actions/DialogActions';
import { connect } from 'react-redux';
import { AppAction } from '../actions';
import Button from './Button';
import { ReactComponent as CloseIcon } from '../icons/close.svg';
import { AppState } from '../types/StateTypes';
import { DialogType } from '../types/DialogTypes';

interface OwnProps {
    children: ReactNode,
    type: DialogType,
    headline: string,
    description: string,
    cancelButtonText?: string,
    actionButton?: ReactNode,
    onClose?: () => void,
}

interface StateProps {
    isOpen: boolean,
    currentType: DialogType,
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

        if (onClose) {
            onClose();
        }

        closeDialog();
    }

    render() {
        const { children, description, type, currentType, headline, cancelButtonText, actionButton, isOpen } = this.props;
        const hasChildren = React.Children.count(children) > 0;

        if (!isOpen || type !== currentType) {
            return null;
        }

        return (
            <div id='dialog-overlay' onClick={this.handleClose}>
                <div id={`${type ? `dialog--${type}` : ''}`} className='dialog' onClick={this.handleClick}>
                    <h2 className='headline'>{headline}</h2>
                    <section className='text'>
                        <p className='description'>{description}</p>
                    </section>
                    {hasChildren &&
                        <div className='content'>
                            {children}
                        </div>
                    }
                    <div className='buttons'>
                        <Button isActive action={this.handleClose}>
                            {cancelButtonText !== undefined ? cancelButtonText : 'Cancel'}
                        </Button>
                        {actionButton}
                    </div>
                    <CloseIcon className='icon-close' onClick={this.handleClose} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    isOpen: state.dialog.isOpen,
    currentType: state.dialog.type,
});

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    closeDialog: () => dispatch(closeDialog),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);