import React, { Dispatch, ReactNode } from 'react';
import './Dialog.scss';
import { closeDialog } from '../../actions/DialogActions';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import { ReactComponent as CloseIcon } from '../../icons/close.svg';
import { AppState } from '../../types/StateTypes';
import { DialogType } from '../../types/DialogTypes';
import { KEY_ENTER_ID, KEY_ESC_ID } from '../../constants';
import Overlay from '../overlays/Overlay';
import SpinnerOverlay from '../overlays/SpinnerOverlay';
import Button from '../buttons/Button';
import i18n from '../../i18n';

interface OwnProps {
    children?: ReactNode,
    type: DialogType,
    classes?: string[],
    headline: string,
    message?: string,
    explanation?: string,
    cancelButtonText?: string,
    actionButtonText?: string,
    onAction?: () => Promise<void>,
    onCancel?: () => void,
    isActionButtonActive?: boolean,
}

interface StateProps {
    isOpen: boolean,
    language: i18n,
}

interface DispatchProps {
    closeDialog: () => void,
}

type Props = OwnProps & StateProps & DispatchProps;

interface State {
    isLoading: boolean,
}

class Dialog extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            isLoading: false,
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
        const { isLoading } = this.state;
        
        // Pressing on enter inside dialog is the same as
        // pressing on action button
        if (!isLoading && e.keyCode === KEY_ENTER_ID && isActionButtonActive) {
            this.handleAction();
        }
    }

    handleEscPress = (e: KeyboardEvent) => {
        const { isLoading } = this.state;
        
        // Pressing on escape inside dialog is the same as
        // pressing on cancel button
        if (!isLoading && e.keyCode === KEY_ESC_ID) {
            this.handleCancel();
        }
    }

    handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
    }

    handleAction = () => {
        const { onAction, closeDialog } = this.props;

        if (onAction) {
            this.showSpinner();

            onAction().then(() => {
                this.hideSpinner();
                
                closeDialog();
            });
        } else {
            closeDialog();
        }
    }

    handleCancel = () => {
        const { onCancel, closeDialog } = this.props;
        const { isLoading } = this.state;

        // Do not close dialog when executing an action!
        if (!isLoading) {
            if (onCancel) {
                onCancel();
            }
            
            closeDialog();
        }
    }

    showSpinner = () => {
        this.setState({
            isLoading: true,
        });
    }

    hideSpinner = () => {
        this.setState({
            isLoading: false,
        });
    }

    getClasses = () => {
        const { classes } = this.props;

        if (classes !== undefined) {
            return classes.map(c => 'dialog--' + c).join(' ');
        }

        return '';
    }

    render() {
        const { children, message, explanation, type, headline, cancelButtonText, actionButtonText, isActionButtonActive, isOpen, language, onCancel } = this.props;
        const { isLoading } = this.state;
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
                onMouseDown={this.handleCancel}
            >
                <div
                    id={`${type ? `dialog--${type}` : ''}`}
                    className={`
                        dialog
                        ${this.getClasses()}
                    `}
                    onMouseDown={this.handleMouseDown}
                >
                    <div className='wrapper'>
                        {isLoading && <SpinnerOverlay />}

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
                                    {cancelButtonText !== undefined ? cancelButtonText : language.getText('CANCEL')}
                                </Button>
                            }
                        
                            <Button
                                isActive={isActionButtonActive !== undefined && isActionButtonActive}
                                action={this.handleAction}
                            >
                                {actionButtonText !== undefined ? actionButtonText : language.getText('OK')}
                            </Button>
                        </div>

                        <CloseIcon className='icon-close' onClick={this.handleCancel} />
                    </div>
                </div>
            </Overlay>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => {
    const { type } = ownProps;
    const { language } = state.settings;
    const { isOpen } = state.dialog[type];
    
    return {
        isOpen,
        language,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>, ownProps: OwnProps) => {
    const { type } = ownProps;

    return {
        closeDialog: () => dispatch(closeDialog(type)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);