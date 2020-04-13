import React, { Dispatch } from 'react';
import './FormSignIn.scss';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import FormTextField from './FormTextField';
import { FormFields, INIT_FIELD_STATE } from '../../types/FormTypes';
import Form from './Form';
import { SignInCall } from '../../calls/CallSignIn';
import { setSuccessDialog, openDialog, setErrorDialog, closeDialog } from '../../actions/DialogActions';
import { DialogType } from '../../types/DialogTypes';

const INIT_STATE = {
    fields: {
        email: { ...INIT_FIELD_STATE },
        password: { ...INIT_FIELD_STATE },
    },
    canSubmit: false,
};

interface DispatchProps {
    openSuccessDialog: (message: string) => void,
    openErrorDialog: (message: string, explanation: string) => void,
    closeSignInDialog: () => void,
}

type Props = DispatchProps;

interface State {
    fields: FormFields,
    canSubmit: boolean,
}

class FormSignIn extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = { ...INIT_STATE };
    }

    getPayload = (): object => {
        const { fields } = this.state;

        return Object.keys(fields).reduce((content: object, name: string) => {
            return {
                ...content,
                [name]: fields[name].value,
            };
        }, {});
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value }  = e.target;

        const fields = {
            ...this.state.fields,
            [name]: {
                value,
                error: '',
            },
        };

        const canSubmit = Object.values(fields).map(field => field.value).every(value => value !== '');

        this.setState({
            fields,
            canSubmit,
        });
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const { openSuccessDialog, openErrorDialog, closeSignInDialog } = this.props;
        
        e.preventDefault();

        new SignInCall(this.getPayload()).execute()
            .then((response: any) => {
                closeSignInDialog();
                openSuccessDialog('You have successfully signed in.');
            })
            .catch((error: any) => {
                closeSignInDialog();
                openErrorDialog('There was an error while signing in:', error.message);
            });
    }

    render() {
        const { fields, canSubmit } = this.state;
        const { email, password } = fields;

        return (
            <Form
                id='sign-in'
                submitText='Sign in'
                onSubmit={this.handleSubmit}
                canSubmit={canSubmit}
            >
                    <FormTextField
                        type='email'
                        name='email'
                        label='E-mail'
                        onChange={this.handleChange}
                        value={email.value}
                        error={email.error}
                    />

                    <FormTextField
                        type='password'
                        name='password'
                        label='Password'
                        onChange={this.handleChange}
                        value={password.value}
                        error={password.error}
                    />
            </Form>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => {
    return {
        openSuccessDialog: (message: string) => {
            dispatch(setSuccessDialog(message));
            dispatch(openDialog(DialogType.Success));
        },
        openErrorDialog: (message: string, explanation: string) => {
            dispatch(setErrorDialog(message, explanation));
            dispatch(openDialog(DialogType.Error));
        },
        closeSignInDialog: () => dispatch(closeDialog(DialogType.SignIn)),
    };
};

export default connect(() => ({}), mapDispatchToProps)(FormSignIn);