import React from 'react';
import './FormCreateGame.scss';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import FormTextField from './FormTextField';
import { FormFields, INIT_FIELD_STATE } from '../../types/FormTypes';
import Form from './Form';
import { closeDialog } from '../../actions/DialogActions';
import { DialogType } from '../../types/DialogTypes';
import { getFormPayload } from '../../lib';
import { createGame } from '../../actions/ServerActions';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../types/StateTypes';

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
    closeCreateGameDialog: () => void,
    createGame: (name: string, self: string, opponents: string[]) => Promise<number>,
}

type Props = StateProps &  DispatchProps;

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

    handleSubmit = (e: React.FormEvent) => {
        const { self, createGame, closeCreateGameDialog } = this.props;
        const { name, user1, user2, user3 } = getFormPayload(this.state.fields);

        e.preventDefault();

        createGame(name, self, [ user1, user2, user3 ])
            .then((id: number) => {
                closeCreateGameDialog();

                if (id !== -1) {
                    document.location.replace(`/samurai/game/${id}/`);
                }
            });
    }
    
    render() {
        const { closeCreateGameDialog } = this.props;
        const { fields, isFilled } = this.state;
        const { name, user1, user2, user3 } = fields;

        return (
            <Form
                id='create-game'
                submitText='Create'
                onCancel={closeCreateGameDialog}
                onSubmit={this.handleSubmit}
                canSubmit={isFilled}
            >
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
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    self: 'd.leclerc.pro@gmail.com', // FIXME!
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    closeCreateGameDialog: () => dispatch(closeDialog(DialogType.CreateGame)),
    createGame: (name: string, self: string, opponents: string[]) => dispatch(createGame(name, self, opponents)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormCreateGame);