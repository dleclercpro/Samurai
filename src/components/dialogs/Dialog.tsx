import React, { Dispatch, ReactNode } from 'react';
import './Dialog.scss';
import { closeDialog } from '../../actions/DialogActions';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import Button from '../Button';
import { ReactComponent as CloseIcon } from '../../icons/close.svg';
import { AppState } from '../../types/StateTypes';
import { DialogType } from '../../types/DialogTypes';

interface OwnProps {
    children?: ReactNode,
    type: DialogType,
    headline: string,
    description: string,
    cancelButtonText?: string,
    actionButtonText?: string,
    onClose?: () => void,
    onCancel?: () => void,
    onAction?: () => void,
    isActionButtonActive: boolean,
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

    handleAction = () => {
        const { onAction, closeDialog } = this.props;

        if (onAction) {
            onAction();
        }

        closeDialog();
    }

    handleCancel = () => {
        const { onCancel, closeDialog } = this.props;

        if (onCancel) {
            onCancel();
        }

        closeDialog();
    }

    handleClose = () => {
        const { onClose, closeDialog } = this.props;

        // Close only if callback provided
        if (onClose) {
            onClose();
            closeDialog();
        }
    }

    render() {
        const { children, description, type, headline, cancelButtonText, actionButtonText, isActionButtonActive, isOpen, onAction } = this.props;
        const hasChildren = React.Children.count(children) > 0;
        const hasActionButton = onAction !== undefined;

        if (!isOpen) {
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
                        <Button isActive action={this.handleCancel}>
                            {cancelButtonText !== undefined ? cancelButtonText : 'Cancel'}
                        </Button>
                        
                        {hasActionButton &&
                        <Button isActive={isActionButtonActive} action={this.handleAction}>
                            {actionButtonText !== undefined ? actionButtonText : 'OK'}
                        </Button>}
                    </div>

                    <CloseIcon className='icon-close' onClick={this.handleClose} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => {
    const { type } = ownProps;
    const { dialog } = state;
    const { isOpen } = dialog[type];
    
    return {
        isOpen,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>, ownProps: OwnProps) => {
    const { type } = ownProps;

    return {
        closeDialog: () => dispatch(closeDialog(type)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);