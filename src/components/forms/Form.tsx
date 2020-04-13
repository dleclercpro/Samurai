import React, { ReactNode } from 'react';
import './Form.scss';
import Button from '../Button';

interface OwnProps {
    id: string,
    children?: ReactNode,
    cancelText?: string,
    submitText?: string,
    onCancel?: () => void,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    canSubmit: boolean,
}

type Props = OwnProps;

const Form: React.FC<Props> = (props) => {
    const { id, children, cancelText, onCancel, submitText, onSubmit, canSubmit } = props;

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

export default Form;