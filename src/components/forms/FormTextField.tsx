import React from 'react';
import './FormTextField.scss';

interface OwnProps {
    type?: string,
    name: string,
    label: string,
    value: string | number,
    error: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
}

type Props = OwnProps;

const FormTextField: React.FC<Props> = (props) => {
    const { type, name, label, value, error, onChange, onBlur } = props;
    const hasError = error !== '';

    return (
        <label className={`
            form-text-field
            form-text-field--${name}
            ${hasError ? 'has-error' : ''}
        `}>
            <span className='label'>{label}:</span>
            <input
                type={type === undefined ? 'text' : type}
                name={name}
                onChange={onChange}
                onBlur={onBlur !== undefined ? onBlur : () => {}}
                value={value}
            />
                {hasError &&
                    <p className='error'>{error}</p>
                }
        </label>
    );
}

export default FormTextField;