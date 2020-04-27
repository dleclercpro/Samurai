import React from 'react';
import './FormCreateGame.scss';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import FormTextField from './FormTextField';
import { FormFields, INIT_FIELD_STATE } from '../../types/FormTypes';
import Form from './Form';
import { DialogType } from '../../types/DialogTypes';
import { getFormPayload } from '../../lib';
import { createGame, refreshGame } from '../../actions/ServerActions';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../types/StateTypes';
import { Redirect } from 'react-router-dom';
import Dialog from '../dialogs/Dialog';

const INIT_STATE = {
    fields: {
        name: { ...INIT_FIELD_STATE },
        user1: { ...INIT_FIELD_STATE },
        user2: { ...INIT_FIELD_STATE },
        user3: { ...INIT_FIELD_STATE },
    },
    isFilled: false,
    redirectToGame: false,
};

interface StateProps {
    self: string,
    gameId: number,
}

interface DispatchProps {
    createGame: (name: string, self: string, opponents: string[]) => Promise<void>,
    refreshGame: () => Promise<void>,
}

type Props = StateProps &  DispatchProps;

interface State {
    fields: FormFields,
    isFilled: boolean,
    redirectToGame: boolean,
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
        const { self, createGame, refreshGame } = this.props;
        const { name, user1, user2, user3 } = getFormPayload(this.state.fields);

        return createGame(name, self, [ user1, user2, user3 ])
            .then(() => {
                return refreshGame();
            })
            .then(() => {
                this.setState({
                    redirectToGame: true,
                });
            });
    }
    
    render() {
        const { fields, isFilled, redirectToGame } = this.state;
        const { name, user1, user2, user3 } = fields;

        if (redirectToGame) {
            return <Redirect to={`/samurai/game/`} />
        }

        return (
            <Dialog
                type={DialogType.CreateGame}
                headline='Create game'
                message='Provide the following information to create a new game:'
                actionButtonText='Create'
                isActionButtonActive={isFilled}
                onAction={this.handleSubmit}
                onCancel={() => {}}
                shouldCloseAfterAction={false}
                >
                <Form id='create-game'>
                    <FormTextField
                        name='name'
                        label='Game name'
                        onChange={this.handleChange}
                        value={name.value}
                        error={name.error}
                        autoFocus
                    />

                    <FormTextField
                        type='email'
                        name='user1'
                        label='Player 1 (E-mail)'
                        onChange={this.handleChange}
                        value={user1.value}
                        error={user1.error}
                    />

                    <FormTextField
                        type='email'
                        name='user2'
                        label='Player 2 (E-mail)'
                        onChange={this.handleChange}
                        value={user2.value}
                        error={user2.error}
                    />

                    <FormTextField
                        type='email'
                        name='user3'
                        label='Player 3 (E-mail)'
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
    gameId: state.game.id,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    refreshGame: () => dispatch(refreshGame()),
    createGame: (name: string, self: string, opponents: string[]) => dispatch(createGame(name, self, opponents)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormCreateGame);