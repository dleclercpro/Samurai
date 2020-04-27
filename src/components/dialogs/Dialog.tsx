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
import SpinnerOverlay from '../SpinnerOverlay';
import { openSpinnerOverlay, closeSpinnerOverlay } from '../../actions/OverlayActions';

interface OwnProps {
    children?: ReactNode,
    type: DialogType,
    headline: string,
    message?: string,
    explanation?: string,
    cancelButtonText?: string,
    actionButtonText?: string,
    onCancel?: () => void,
    onAction?: () => Promise<void>,
    shouldClose: boolean,
    isActionButtonActive?: boolean,
}

interface StateProps {
    isOpen: boolean,
}

interface DispatchProps {
    closeDialog: () => void,
    openSpinnerOverlay: () => void,
    closeSpinnerOverlay: () => void,
}

type Props = OwnProps & StateProps & DispatchProps;

interface State {
    canClose: boolean,
}

class Dialog extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            canClose: true,
        };
    }

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
        const { onAction, closeDialog, shouldClose } = this.props;
        const { canClose } = this.state;

        if (onAction) {
            this.showSpinner();

            onAction().then(() => {
                this.hideSpinner();

                if (shouldClose && canClose) {
                    closeDialog();
                }
            });

            return;
        }

        if (shouldClose && canClose) {
            closeDialog();
        }
    }

    handleCancel = () => {
        const { onCancel, closeDialog, shouldClose } = this.props;
        const { canClose } = this.state;

        if (onCancel) {
            onCancel();
        }
        
        if (shouldClose && canClose) {
            closeDialog();
        }
    }

    showSpinner = () => {
        const { openSpinnerOverlay } = this.props;

        this.setState({
            canClose: false,
        });

        openSpinnerOverlay();
    }

    hideSpinner = () => {
        const { closeSpinnerOverlay } = this.props;

        this.setState({
            canClose: true,
        });

        closeSpinnerOverlay();
    }

    render() {
        const { children, message, explanation, type, headline, cancelButtonText, actionButtonText, isActionButtonActive, isOpen, onCancel } = this.props;
        const hasChildren = React.Children.count(children) > 0;
        const hasMessage = message !== undefined && message !== '';
        const hasExplanation = explanation !== undefined && explanation !== '';
        const hasCancelButton = onCancel !== undefined;

        if (!isOpen) {
            return null;
        }

        return (
            <Overlay
                id='dialog'
                onClick={this.handleCancel}
            >
                <div id={`${type ? `dialog--${type}` : ''}`} className='dialog' onClick={this.handleClick}>
                    <SpinnerOverlay />

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

                    <div className='buttons'>
                        {hasCancelButton &&
                            <Button
                                isActive
                                action={this.handleCancel}
                            >
                                {cancelButtonText !== undefined ? cancelButtonText : 'Cancel'}
                            </Button>
                        }
                    
                        <Button
                            isActive={isActionButtonActive !== undefined && isActionButtonActive}
                            action={this.handleAction}
                        >
                            {actionButtonText !== undefined ? actionButtonText : 'OK'}
                        </Button>
                    </div>

                    <CloseIcon className='icon-close' onClick={this.handleCancel} />
                </div>
            </Overlay>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => {
    const { type } = ownProps;
    const { isOpen } = state.dialog[type];
    
    return {
        isOpen,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>, ownProps: OwnProps) => {
    const { type } = ownProps;

    return {
        openSpinnerOverlay: () => dispatch(openSpinnerOverlay),
        closeSpinnerOverlay: () => dispatch(closeSpinnerOverlay),
        closeDialog: () => dispatch(closeDialog(type)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);