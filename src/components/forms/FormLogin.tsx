import React, { Dispatch } from 'react';
import './FormLogin.scss';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import FormTextField from './FormTextField';
import { FormFields, INIT_FIELD_STATE } from '../../types/FormTypes';
import Form from './Form';

const INIT_STATE = {
    fields: {
        email: { ...INIT_FIELD_STATE },
        password: { ...INIT_FIELD_STATE },
    },
    canSubmit: false,
};

interface DispatchProps {

}

type Props = DispatchProps;

interface State {
    fields: FormFields,
    canSubmit: boolean,
}

class FormLogin extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = { ...INIT_STATE };
    }

    handleChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const fields = {
            ...this.state.fields,
            [field]: {
                value: e.target.value,
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
        const { canSubmit } = this.state;

        if (canSubmit) {
            alert('Logging in on server.');
        }
    }

    render() {
        const { fields, canSubmit } = this.state;
        const { email, password } = fields;

        return (
            <Form
                id='login'
                submitText='Log in'
                onSubmit={this.handleSubmit}
                canSubmit={canSubmit}
            >
                    <FormTextField
                        name='email'
                        label='E-mail'
                        onChange={(e) => { this.handleChange('email', e) }}
                        value={email.value}
                        error={email.error}
                    />

                    <FormTextField
                        name='password'
                        label='Password'
                        onChange={(e) => { this.handleChange('password', e) }}
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

export default connect(() => ({}), mapDispatchToProps)(FormLogin);