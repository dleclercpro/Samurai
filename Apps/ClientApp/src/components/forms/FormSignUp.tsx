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
import i18n from '../../i18n';

const INIT_STATE = {
    fields: {
        username: { ...INIT_FIELD_STATE },
        email: { ...INIT_FIELD_STATE },
        password: { ...INIT_FIELD_STATE },
        repeatedPassword: { ...INIT_FIELD_STATE },
    },
    isFilled: false,
    hasErrors: false,
};

interface StateProps {
    language: i18n,
}

interface DispatchProps {
    signUp: (username: string, email: string, password: string) => Promise<void>,
}

type Props = StateProps & DispatchProps;

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
        const { language } = this.props;

        switch (field) {
            case 'email':
                return language.getText('INVALID_EMAIL');
            case 'repeatedPassword':
                return language.getText('INVALID_PASSWORD_CONFIRMATION');
            default:
                return language.getText('INVALID_FIELD');
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
        const { username, email, password } = getFormPayload(this.state.fields);

        return signUp(username, email, password)
            .then(() => {
                this.setState({ ...INIT_STATE });
            })
            .catch(() => {
                
            });
    }
    
    render() {
        const { language } = this.props;
        const { fields, isFilled, hasErrors } = this.state;
        const { username, email, password, repeatedPassword } = fields;

        return (
            <Dialog
                type={DialogType.SignUp}
                headline={language.getText('SIGN_UP')}
                message={language.getText('SIGN_UP_MESSAGE')}
                actionButtonText={language.getText('SIGN_UP')}
                isActionButtonActive={isFilled && !hasErrors}
                onAction={this.handleSubmit}
                onCancel={() => {}}
            >
                <Form id='sign-up'>
                    <FormTextField
                        type='email'
                        name='email'
                        label={language.getText('E_MAIL')}
                        onChange={(e) => { this.handleChange(e, this.isEmailValid) }}
                        value={email.value}
                        error={email.error}
                    />

                    <FormTextField
                        name='username'
                        label={language.getText('USERNAME')}
                        onChange={this.handleChange}
                        value={username.value}
                        error={username.error}
                    />

                    <FormTextField
                        type='password'
                        name='password'
                        label={language.getText('PASSWORD')}
                        onChange={(e) => { this.handleChange(e) }}
                        value={password.value}
                        error={password.error}
                    />

                    <FormTextField
                        type='password'
                        name='repeatedPassword'
                        label={language.getText('PASSWORD_AGAIN')}
                        onChange={(e) => { this.handleChange(e, this.isRepeatedPasswordValid) }}
                        value={repeatedPassword.value}
                        error={repeatedPassword.error}
                    />
                </Form>
            </Dialog>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { language } = state.settings;

    return {
        language,
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    signUp: (username: string, email: string, password: string) => dispatch(signUp(username, email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormSignUp);