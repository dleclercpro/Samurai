import React from 'react';
import './FormSignIn.scss';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import FormTextField from './FormTextField';
import { FormFields, INIT_FIELD_STATE } from '../../types/FormTypes';
import Form from './Form';
import { DialogType } from '../../types/DialogTypes';
import { getFormPayload } from '../../lib';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../types/StateTypes';
import { login } from '../../actions/ServerActions';
import Dialog from '../dialogs/Dialog';

const INIT_STATE = {
    fields: {
        email: { ...INIT_FIELD_STATE },
        password: { ...INIT_FIELD_STATE },
    },
    isFilled: false,
};

interface DispatchProps {
    signIn: (email: string, password: string) => Promise<void>,
}

type Props = DispatchProps;

interface State {
    fields: FormFields,
    isFilled: boolean,
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

        const isFilled = Object.values(fields).map(field => field.value).every(value => value !== '');

        this.setState({
            fields,
            isFilled,
        });
    }

    handleSubmit = () => {
        const { signIn } = this.props;
        const { email, password } = getFormPayload(this.state.fields);
  
        return signIn(email, password);
    }

    render() {
        const { fields, isFilled } = this.state;
        const { email, password } = fields;

        return (
            <Dialog
                type={DialogType.SignIn}
                headline='Sign in'
                actionButtonText='Sign in'
                isActionButtonActive={isFilled}
                onAction={this.handleSubmit}
                onCancel={() => {}}
                shouldClose
            >
                <Form id='sign-in'>
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
            </Dialog>
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    signIn: (email: string, password: string) => dispatch(login(email, password)),
});

export default connect(() => ({}), mapDispatchToProps)(FormSignIn);