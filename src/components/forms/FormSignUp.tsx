import React, { Dispatch } from 'react';
import './FormSignUp.scss';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import FormTextField from './FormTextField';
import { FormFields, INIT_FIELD_STATE } from '../../types/FormTypes';
import Form from './Form';

const ERROR_EMAIL = 'The e-mail address you typed in does not seem to be valid.';

const ERROR_PASSWORD = 'Your password needs at least eight characters, ' +
    'one uppercase letter, one lowercase letter, one number and ' +
    'one special character.';

const INIT_STATE = {
    fields: {
        username: { ...INIT_FIELD_STATE },
        firstName: { ...INIT_FIELD_STATE },
        lastName: { ...INIT_FIELD_STATE },
        email: { ...INIT_FIELD_STATE },
        password: { ...INIT_FIELD_STATE },
    },
    isFilled: false,
    hasErrors: false,
};

interface DispatchProps {

}

type Props = DispatchProps;

interface State {
    fields: FormFields,
    isFilled: boolean,
    hasErrors: boolean,
}

class FormSignUp extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = { ...INIT_STATE };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>, validator?: (field: string) => boolean) => {
        const { name, value }  = e.target;
        const isInvalid = value !== '' && validator !== undefined && !validator(value);
        
        const fields = {
            ...this.state.fields,
            [name]: {
                value: value,
                error: isInvalid ? this.getError(name) : '',
            },
        };

        const isFilled = Object.values(fields).map(field => field.value).every(value => value !== '');
        const hasErrors = Object.values(fields).map(field => field.error).some(value => value !== '');

        this.setState({
            fields,
            isFilled,
            hasErrors,
        });
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        alert('Signing up on server.');
    }

    getError = (field: string): string => {
        switch (field) {
            case 'email':
                return ERROR_EMAIL;
            case 'password':
                return ERROR_PASSWORD;
            default:
                return 'Invalid field.';
        }
    }

    validate = (field: string, validator: (field: string) => boolean) => {
        const { value } = this.state.fields[field];

        if (!validator(value)) {
            this.setState({
                fields: {
                    ...this.state.fields,
                    [field]: {
                        error: this.getError(field),
                        value,
                    },
                },
            });
        }
    }

    /**
     * E-mail has to follow this pattern (in order):
     * - Characters (no space)
     * - @
     * - Characters
     * - .
     * - Characters
     */
    isEmailValid = (email: string): boolean => {
        return /\S+@\S+\.\S+/.test(email);
    }
    
    /**
     * Password has to have at least:
     * - 8 characters
     * - 1 uppercase letter
     * - 1 lowercase letter
     * - 1 number
     * - 1 special character
     */
    isPasswordValid = (password: string): boolean => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    }

    render() {
        const { fields, isFilled, hasErrors } = this.state;
        const { username, firstName, lastName, email, password } = fields;

        return (
            <Form
                id='sign-up'
                submitText='Sign up'
                onSubmit={this.handleSubmit}
                canSubmit={isFilled && !hasErrors}
            >
                <FormTextField
                    name='firstName'
                    label='First name'
                    onChange={this.handleChange}
                    value={firstName.value}
                    error={firstName.error}
                />

                <FormTextField
                    name='lastName'
                    label='Last name'
                    onChange={this.handleChange}
                    value={lastName.value}
                    error={lastName.error}
                />

                <FormTextField
                    name='username'
                    label='Username'
                    onChange={this.handleChange}
                    value={username.value}
                    error={username.error}
                />

                <FormTextField
                    name='email'
                    label='E-mail'
                    onChange={(e) => { this.handleChange(e, this.isEmailValid) }}
                    value={email.value}
                    error={email.error}
                />

                <FormTextField
                    type='password'
                    name='password'
                    label='Password'
                    onChange={(e) => { this.handleChange(e, this.isPasswordValid) }}
                    value={password.value}
                    error={password.error}
                />
            </Form>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => {
    return {

    };
};

export default connect(() => ({}), mapDispatchToProps)(FormSignUp);