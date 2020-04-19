import React from 'react';
import './FormSignIn.scss';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import FormTextField from './FormTextField';
import { FormFields, INIT_FIELD_STATE } from '../../types/FormTypes';
import Form from './Form';
import { closeDialog } from '../../actions/DialogActions';
import { DialogType } from '../../types/DialogTypes';
import { getFormPayload } from '../../lib';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../types/StateTypes';
import { signIn } from '../../actions/ServerActions';

const INIT_STATE = {
    fields: {
        email: { ...INIT_FIELD_STATE },
        password: { ...INIT_FIELD_STATE },
    },
    canSubmit: false,
};

interface DispatchProps {
    closeSignInDialog: () => void,
    signIn: (email: string, password: string) => Promise<void>,
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
        const { signIn, closeSignInDialog } = this.props;
        const { email, password } = getFormPayload(this.state.fields);
  
        e.preventDefault();

        signIn(email, password)
            .then(() => {
                closeSignInDialog();
            });
    }

    render() {
        const { closeSignInDialog } = this.props;
        const { fields, canSubmit } = this.state;
        const { email, password } = fields;

        return (
            <Form
                id='sign-in'
                submitText='Sign in'
                onCancel={closeSignInDialog}
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
                        autoFocus
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

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    closeSignInDialog: () => dispatch(closeDialog(DialogType.SignIn)),
    signIn: (email: string, password: string) => dispatch(signIn(email, password)),
});

export default connect(() => ({}), mapDispatchToProps)(FormSignIn);