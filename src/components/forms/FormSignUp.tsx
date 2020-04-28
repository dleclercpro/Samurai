import React from 'react';
import './FormSignUp.scss';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import FormTextField from './FormTextField';
import { FormFields, INIT_FIELD_STATE } from '../../types/FormTypes';
import Form from './Form';
import { DialogType } from '../../types/DialogTypes';
import { getFormPayload } from '../../lib';
import { signUp } from '../../actions/ServerActions';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../types/StateTypes';
import Dialog from '../dialogs/Dialog';

const ERROR_EMAIL = 'The e-mail address you typed in does not seem to be valid.';

const ERROR_PASSWORD = 'Your password needs at least eight characters, ' +
    'one uppercase letter, one lowercase letter, one number and ' +
    'one special character.';

const ERROR_REPEATED_PASSWORD = "Your passwords don't match!";

const INIT_STATE = {
    fields: {
        username: { ...INIT_FIELD_STATE },
        firstName: { ...INIT_FIELD_STATE },
        lastName: { ...INIT_FIELD_STATE },
        email: { ...INIT_FIELD_STATE },
        password: { ...INIT_FIELD_STATE },
        repeatedPassword: { ...INIT_FIELD_STATE },
    },
    isFilled: false,
    hasErrors: false,
};

interface DispatchProps {
    signUp: (username: string, firstName: string, lastName: string, email: string, password: string) => Promise<void>,
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

    isRepeatedPasswordValid = (password: string): boolean => {
        return password === this.state.fields.password.value;
    }

    getError = (field: string): string => {
        switch (field) {
            case 'email':
                return ERROR_EMAIL;
            case 'password':
                return ERROR_PASSWORD;
            case 'repeatedPassword':
                return ERROR_REPEATED_PASSWORD;
            default:
                return 'Invalid field.';
        }
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

    handleSubmit = () => {
        const { signUp } = this.props;
        const { username, firstName, lastName, email, password } = getFormPayload(this.state.fields);

        return signUp(username, firstName, lastName, email, password);
    }
    
    render() {
        const { fields, isFilled, hasErrors } = this.state;
        const { username, firstName, lastName, email, password, repeatedPassword } = fields;

        return (
            <Dialog
                type={DialogType.SignUp}
                headline='Sign up'
                message='Provide the following information to register as a user:'
                actionButtonText='Sign up'
                isActionButtonActive={isFilled && !hasErrors}
                onAction={this.handleSubmit}
                onCancel={() => {}}
            >
                <Form id='sign-up'>
                    <FormTextField
                        name='firstName'
                        label='First name'
                        onChange={this.handleChange}
                        value={firstName.value}
                        error={firstName.error}
                        autoFocus
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
                        type='email'
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

                    <FormTextField
                        type='password'
                        name='repeatedPassword'
                        label='Password (again)'
                        onChange={(e) => { this.handleChange(e, this.isRepeatedPasswordValid) }}
                        value={repeatedPassword.value}
                        error={repeatedPassword.error}
                    />
                </Form>
            </Dialog>
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    signUp: (username: string, firstName: string, lastName: string, email: string, password: string) => dispatch(signUp(username, firstName, lastName, email, password)),
});

export default connect(() => ({}), mapDispatchToProps)(FormSignUp);