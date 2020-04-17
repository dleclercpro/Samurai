import React, { ReactNode } from 'react';
import './Form.scss';
import Button from '../Button';
import { KEY_ESC_ID } from '../../constants';

interface OwnProps {
    id: string,
    children?: ReactNode,
    cancelText?: string,
    submitText?: string,
    onCancel: () => void,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    canSubmit: boolean,
}

type Props = OwnProps;

class Form extends React.Component<Props, {}> {

    handleEscPress = (e: KeyboardEvent) => {
        const { onCancel } = this.props;
        
        // Pressing on escape inside form is the same as
        // pressing on cancel button
        if (e.keyCode === KEY_ESC_ID) {
            onCancel();
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleEscPress, false);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleEscPress, false);
    }
    
    render() {
        const { id, children, cancelText, submitText, onCancel, onSubmit, canSubmit } = this.props;

        return (
            <form
                id={`form-${id}`}
                className='form'
                method='POST'
                onSubmit={onSubmit}
            >
                <div className='fields'>
                    {children}
                </div>
                
                <div className='buttons'>
                    <Button isActive action={onCancel}>
                        {cancelText !== undefined ? cancelText : 'Cancel'}
                    </Button>
                    <Button type='submit' isActive={canSubmit}>
                        {submitText !== undefined ? submitText : 'Submit'}
                    </Button>
                </div>
            </form>
        );
    }
}

export default Form;