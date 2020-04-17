import React, { Dispatch, ReactNode } from 'react';
import './Dialog.scss';
import { closeDialog } from '../../actions/DialogActions';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import Button from '../Button';
import { ReactComponent as CloseIcon } from '../../icons/close.svg';
import { AppState } from '../../types/StateTypes';
import { DialogType } from '../../types/DialogTypes';
import Overlay from '../Overlay';
import { KEY_ENTER_ID, KEY_ESC_ID } from '../../constants';

interface OwnProps {
    children?: ReactNode,
    type: DialogType,
    headline: string,
    message?: string,
    explanation?: string,
    cancelButtonText?: string,
    actionButtonText?: string,
    onClose?: () => void,
    onCancel?: () => void,
    onAction?: () => void,
    canClose?: boolean,
    isActionButtonActive?: boolean,
}

interface StateProps {
    isOpen: boolean,
}

interface DispatchProps {
    closeDialog: () => void,
}

type Props = OwnProps & StateProps & DispatchProps;

class Dialog extends React.Component<Props, {}> {

    componentDidUpdate(prevProps: Props) {
        const wasClosed = prevProps.isOpen && !this.props.isOpen;
        const wasOpened = !prevProps.isOpen && this.props.isOpen;

        if (wasOpened) {
            document.addEventListener('keydown', this.handleEnterPress, false);
            document.addEventListener('keydown', this.handleEscPress, false);
        }

        if (wasClosed) {
            document.removeEventListener('keydown', this.handleEnterPress, false);
            document.removeEventListener('keydown', this.handleEscPress, false);
        }
    }

    handleEnterPress = (e: KeyboardEvent) => {
        const { isActionButtonActive } = this.props;
        
        // Pressing on enter inside dialog is the same as
        // pressing on action button
        if (e.keyCode === KEY_ENTER_ID && isActionButtonActive) {
            this.handleAction();
        }
    }

    handleEscPress = (e: KeyboardEvent) => {
        
        // Pressing on escape inside dialog is the same as
        // pressing on cancel button
        if (e.keyCode === KEY_ESC_ID) {
            this.handleCancel();
        }
    }

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
        const { onClose, canClose, closeDialog } = this.props;

        if (onClose) {
            onClose();
        }

        if (canClose === undefined || canClose) {
            closeDialog();
        }
    }

    render() {
        const { children, message, explanation, type, headline, cancelButtonText, actionButtonText, isActionButtonActive, isOpen, onCancel, onAction } = this.props;
        const hasChildren = React.Children.count(children) > 0;
        const hasMessage = message !== undefined && message !== '';
        const hasExplanation = explanation !== undefined && explanation !== '';
        const hasButtons = onCancel !== undefined || onAction !== undefined;
        const hasActionButton = onAction !== undefined;

        if (!isOpen) {
            return null;
        }

        return (
            <Overlay
                id='dialog'
                onClick={this.handleClose}
            >
                <div id={`${type ? `dialog--${type}` : ''}`} className='dialog' onClick={this.handleClick}>
                    <h2 className='headline'>{headline}</h2>

                    {hasMessage &&                
                        <section className='text'>
                            <p className='message'>{message}</p>

                            {hasExplanation &&
                                <p className='explanation'>{explanation}</p>
                            }
                        </section>
                    }

                    {hasChildren &&
                        <div className='content'>
                            {children}
                        </div>
                    }

                    {hasButtons &&
                        <div className='buttons'>
                            <Button
                                isActive
                                action={this.handleCancel}
                            >
                                {cancelButtonText !== undefined ? cancelButtonText : 'Cancel'}
                            </Button>
                        
                            {hasActionButton &&
                            <Button
                                isActive={isActionButtonActive !== undefined && isActionButtonActive}
                                action={this.handleAction}
                            >
                                {actionButtonText !== undefined ? actionButtonText : 'OK'}
                            </Button>}
                        </div>
                    }

                    <CloseIcon className='icon-close' onClick={this.handleClose} />
                </div>
            </Overlay>
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