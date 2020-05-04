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
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Dialog from '../dialogs/Dialog';
import i18n from '../../translator';

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
}

interface DispatchProps {
    createGame: (name: string, self: string, opponents: string[]) => Promise<number>,
}

type Props = StateProps & DispatchProps & RouteComponentProps;

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

        const isFilled = Object.values(fields).map(field => field.value).every(value => value !== '');

        this.setState({
            fields,
            isFilled,
        });
    }

    handleSubmit = () => {
        const { self, createGame, history } = this.props;
        const { name, user1, user2, user3 } = getFormPayload(this.state.fields);

        return createGame(name, self, [ user1, user2, user3 ])
            .then((id: number) => {
                if (id !== -1) {
                    history.push(`/game/${id}/`);
                }
            });
    }

    render() {
        const { fields, isFilled } = this.state;
        const { name, user1, user2, user3 } = fields;

        return (
            <Dialog
                type={DialogType.CreateGame}
                headline={i18n.getText('CREATE_GAME')}
                message={i18n.getText('CREATE_GAME_MESSAGE')}
                actionButtonText={i18n.getText('CREATE')}
                isActionButtonActive={isFilled}
                onAction={this.handleSubmit}
                onCancel={() => {}}
            >
                <Form id='create-game'>
                    <FormTextField
                        name='name'
                        label={i18n.getText('GAME_NAME')}
                        onChange={this.handleChange}
                        value={name.value}
                        error={name.error}
                        autoFocus
                    />

                    <FormTextField
                        type='email'
                        name='user1'
                        label={`${i18n.getText('PLAYER')} 1 (${i18n.getText('E_MAIL')})`}
                        onChange={this.handleChange}
                        value={user1.value}
                        error={user1.error}
                    />

                    <FormTextField
                        type='email'
                        name='user2'
                        label={`${i18n.getText('PLAYER')} 2 (${i18n.getText('E_MAIL')})`}
                        onChange={this.handleChange}
                        value={user2.value}
                        error={user2.error}
                    />

                    <FormTextField
                        type='email'
                        name='user3'
                        label={`${i18n.getText('PLAYER')} 3 (${i18n.getText('E_MAIL')})`}
                        onChange={this.handleChange}
                        value={user3.value}
                        error={user3.error}
                    />
                </Form>
            </Dialog>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    self: state.user.email,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    createGame: (name: string, self: string, opponents: string[]) => dispatch(createGame(name, self, opponents)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormCreateGame));