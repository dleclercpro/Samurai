import React from 'react';
import './FormCreateGame.scss';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import FormTextField from './FormTextField';
import { FormFields, INIT_FIELD_STATE } from '../../types/FormTypes';
import Form from './Form';
import { DialogType } from '../../types/DialogTypes';
import { getFormPayload } from '../../lib';
import { createGame } from '../../actions/ServerActions';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../types/StateTypes';
import Dialog from '../dialogs/Dialog';
import i18n from '../../i18n';

const INIT_STATE = {
    fields: {
        name: { ...INIT_FIELD_STATE },
        user1: { ...INIT_FIELD_STATE },
        user2: { ...INIT_FIELD_STATE },
        user3: { ...INIT_FIELD_STATE },
    },
    isFilled: false,
};

interface StateProps {
    self: string,
    language: i18n,
}

interface DispatchProps {
    createGame: (name: string, opponents: string[]) => Promise<void>,
}

type Props = StateProps & DispatchProps;

interface State {
    fields: FormFields,
    isFilled: boolean,
}

class FormCreateGame extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = { ...INIT_STATE };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value }  = e.target;
        
        const fields = {
            ...this.state.fields,
            [name]: {
                ...this.state.fields[name],
                value: value,
            },
        };

        // Remove further players if the ones before them were removed
        if (fields.user1.value === '') {
            fields.user2.value = '';
        }
        if (fields.user2.value === '') {
            fields.user3.value = '';
        }

        // Game has a name and at least one user was entered
        const isFilled = fields.name.value !== '' && (
            fields.user1.value !== '' ||
            fields.user2.value !== '' ||
            fields.user3.value !== ''
        );

        this.setState({
            fields,
            isFilled,
        });
    }

    handleSubmit = () => {
        const { createGame } = this.props;
        const { name, user1, user2, user3 } = getFormPayload(this.state.fields);

        return createGame(name, [ user1, user2, user3 ])
            .then(() => {
                this.setState({ ...INIT_STATE });
            })
            .catch(() => {
                
            });
    }

    render() {
        const { language } = this.props;
        const { fields, isFilled } = this.state;
        const { name, user1, user2, user3 } = fields;

        return (
            <Dialog
                type={DialogType.CreateGame}
                headline={language.getText('CREATE_GAME')}
                message={language.getText('CREATE_GAME_MESSAGE')}
                actionButtonText={language.getText('CREATE')}
                isActionButtonActive={isFilled}
                onAction={this.handleSubmit}
                onCancel={() => {}}
            >
                <Form id='create-game'>
                    <FormTextField
                        name='name'
                        label={language.getText('GAME_NAME')}
                        onChange={this.handleChange}
                        value={name.value}
                        error={name.error}
                        autoFocus
                    />

                    <FormTextField
                        type='email'
                        name='user1'
                        label={`${language.getText('PLAYER')} 1 (${language.getText('E_MAIL')})`}
                        onChange={this.handleChange}
                        value={user1.value}
                        error={user1.error}
                    />

                    <FormTextField
                        type='email'
                        name='user2'
                        label={`${language.getText('PLAYER')} 2 (${language.getText('E_MAIL')})`}
                        remark={language.getText('OPTIONAL')}
                        onChange={this.handleChange}
                        value={user2.value}
                        error={user2.error}
                        disabled={user1.value === ''}
                    />

                    <FormTextField
                        type='email'
                        name='user3'
                        label={`${language.getText('PLAYER')} 3 (${language.getText('E_MAIL')})`}
                        remark={language.getText('OPTIONAL')}
                        onChange={this.handleChange}
                        value={user3.value}
                        error={user3.error}
                        disabled={user1.value === '' || user2.value === ''}
                    />
                </Form>
            </Dialog>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { email } = state.user;
    const { language } = state.settings;
    
    return {
        self: email,
        language,
    };
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    createGame: (name: string, opponents: string[]) => dispatch(createGame(name, opponents)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormCreateGame);