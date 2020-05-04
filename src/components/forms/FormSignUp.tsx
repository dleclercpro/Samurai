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
import i18n from '../../translator';

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

    isRepeatedPasswordValid = (password: string): boolean => {
        return password === this.state.fields.password.value;
    }

    getError = (field: string): string => {
        switch (field) {
            case 'email':
                return i18n.getText('EMAIL_ERROR');
            case 'repeatedPassword':
                return i18n.getText('REPEATED_PASSWORD_ERROR');
            default:
                return i18n.getText('INVALID_FIELD');
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
                headline={i18n.getText('SIGN_UP')}
                message={i18n.getText('SIGN_UP_MESSAGE')}
                actionButtonText={i18n.getText('SIGN_UP')}
                isActionButtonActive={isFilled && !hasErrors}
                onAction={this.handleSubmit}
                onCancel={() => {}}
            >
                <Form id='sign-up'>
                    <FormTextField
                        name='firstName'
                        label={i18n.getText('FIRST_NAME')}
                        onChange={this.handleChange}
                        value={firstName.value}
                        error={firstName.error}
                        autoFocus
                    />

                    <FormTextField
                        name='lastName'
                        label={i18n.getText('LAST_NAME')}
                        onChange={this.handleChange}
                        value={lastName.value}
                        error={lastName.error}
                    />

                    <FormTextField
                        name='username'
                        label={i18n.getText('USERNAME')}
                        onChange={this.handleChange}
                        value={username.value}
                        error={username.error}
                    />

                    <FormTextField
                        type='email'
                        name='email'
                        label={i18n.getText('E_MAIL')}
                        onChange={(e) => { this.handleChange(e, this.isEmailValid) }}
                        value={email.value}
                        error={email.error}
                    />

                    <FormTextField
                        type='password'
                        name='password'
                        label={i18n.getText('PASSWORD')}
                        onChange={(e) => { this.handleChange(e) }}
                        value={password.value}
                        error={password.error}
                    />

                    <FormTextField
                        type='password'
                        name='repeatedPassword'
                        label={i18n.getText('PASSWORD_AGAIN')}
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