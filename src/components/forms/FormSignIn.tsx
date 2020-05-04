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
import { signIn } from '../../actions/ServerActions';
import Dialog from '../dialogs/Dialog';
import i18n from '../../translator';

const INIT_STATE = {
    fields: {
        email: { ...INIT_FIELD_STATE },
        password: { ...INIT_FIELD_STATE },
    },
    isFilled: false,
};

interface DispatchProps {
    setUser: (email: string, password: string) => Promise<void>,
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
        const { setUser } = this.props;
        const { email, password } = getFormPayload(this.state.fields);
  
        return setUser(email, password);
    }

    render() {
        const { fields, isFilled } = this.state;
        const { email, password } = fields;

        return (
            <Dialog
                type={DialogType.SetUser}
                headline={i18n.getText('SIGN_IN')}
                actionButtonText={i18n.getText('SIGN_IN')}
                isActionButtonActive={isFilled}
                onAction={this.handleSubmit}
                onCancel={() => {}}
            >
                <Form id='sign-in'>
                        <FormTextField
                            type='email'
                            name='email'
                            label={i18n.getText('E_MAIL')}
                            onChange={this.handleChange}
                            value={email.value}
                            error={email.error}
                            autoFocus
                        />

                        <FormTextField
                            type='password'
                            name='password'
                            label={i18n.getText('PASSWORD')}
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
    setUser: (email: string, password: string) => dispatch(signIn(email, password)),
});

export default connect(() => ({}), mapDispatchToProps)(FormSignIn);