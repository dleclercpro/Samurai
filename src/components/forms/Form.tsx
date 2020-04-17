import React, { ReactNode } from 'react';
import './Form.scss';
import Button from '../Button';

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