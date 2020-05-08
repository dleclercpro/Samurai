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
import i18n from '../../i18n';

const INIT_STATE = {
    fields: {
        identifier: { ...INIT_FIELD_STATE },
        password: { ...INIT_FIELD_STATE },
    },
    isFilled: false,
};

interface StateProps {
    language: i18n,
}

interface DispatchProps {
    signIn: (identifier: string, password: string) => Promise<void>,
}

type Props = StateProps & DispatchProps;

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
        const { identifier, password } = getFormPayload(this.state.fields);
  
        return signIn(identifier, password)
            .then(() => {
                this.setState({ ...INIT_STATE });
            })
            .catch(() => {

            });
    }

    render() {
        const { language } = this.props;
        const { fields, isFilled } = this.state;
        const { identifier, password } = fields;

        return (
            <Dialog
                type={DialogType.SignIn}
                headline={language.getText('SIGN_IN')}
                actionButtonText={language.getText('SIGN_IN')}
                isActionButtonActive={isFilled}
                onAction={this.handleSubmit}
                onCancel={() => {}}
            >
                <Form id='sign-in'>
                        <FormTextField
                            name='identifier'
                            label={`${language.getText('USERNAME')} / ${language.getText('E_MAIL')}`}
                            onChange={this.handleChange}
                            value={identifier.value}
                            error={identifier.error}
                            autoFocus
                        />
                        <FormTextField
                            type='password'
                            name='password'
                            label={language.getText('PASSWORD')}
                            onChange={this.handleChange}
                            value={password.value}
                            error={password.error}
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
    signIn: (identifier: string, password: string) => dispatch(signIn(identifier, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormSignIn);