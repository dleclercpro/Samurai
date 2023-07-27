import React from 'react';
import './FormTextField.scss';

interface OwnProps {
    type?: string,
    name: string,
    label: string,
    remark?: string,
    value: string | number,
    error: string,
    disabled?: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
    autoFocus?: boolean,
}

type Props = OwnProps;

const FormTextField: React.FC<Props> = (props) => {
    const { type, name, label, remark, value, error, disabled, onChange, onBlur, autoFocus } = props;
    const hasRemark = remark !== undefined;
    const hasError = error !== '';
    const isDisabled = disabled !== undefined && disabled;

    return (
        <label className={`
            form-text-field
            form-text-field--${name}
            ${hasError ? 'has-error' : ''}
            ${isDisabled ? 'is-disabled' : ''}
        `}>
            <span className='label'>{label}:</span>
            <input
                type={type === undefined ? 'text' : type}
                name={name}
                onChange={onChange}
                onBlur={onBlur !== undefined ? onBlur : () => {}}
                value={value}
                autoFocus={autoFocus}
                disabled={disabled}
            />
                {hasRemark &&
                    <p className='remark'>{remark}</p>
                }
                {hasError &&
                    <p className='error'>{error}</p>
                }
        </label>
    );
}

export default FormTextField;