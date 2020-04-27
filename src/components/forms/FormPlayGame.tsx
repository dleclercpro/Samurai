import React from 'react';
import './FormPlayGame.scss';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import FormTextField from './FormTextField';
import { FormFields, INIT_FIELD_STATE } from '../../types/FormTypes';
import Form from './Form';
import { DialogType } from '../../types/DialogTypes';
import { getFormPayload } from '../../lib';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../types/StateTypes';
import { Redirect } from 'react-router-dom';
import Dialog from '../dialogs/Dialog';
import { refreshGame } from '../../actions/ServerActions';

const INIT_STATE = {
    fields: {
        id: { ...INIT_FIELD_STATE },
    },
    isFilled: false,
    redirectToGame: false,
};

interface DispatchProps {
    refreshGame: (id: number) => Promise<void>,
}

type Props = DispatchProps;

interface State {
    fields: FormFields,
    isFilled: boolean,
    redirectToGame: boolean,
}

class FormPlayGame extends React.Component<Props, State> {

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
        const { refreshGame } = this.props;
        const id = parseInt(getFormPayload(this.state.fields).id);

        return refreshGame(id)
            .then(() => {
                this.setState({
                    redirectToGame: true,
                });
            });
    }
    
    render() {
        const { fields, isFilled, redirectToGame } = this.state;
        const { id } = fields;

        if (redirectToGame) {
            return <Redirect to={`/samurai/game/`} />
        }

        return (
            <Dialog
                type={DialogType.PlayGame}
                headline='Play game'
                message='Please enter the ID of the game you want to play in:'
                actionButtonText='Play'
                isActionButtonActive={isFilled}
                onAction={this.handleSubmit}
                onCancel={() => {}}
                shouldCloseAfterAction={false}
            >
                <Form id='play-game'>
                    <FormTextField
                        type='number'
                        name='id'
                        label='Game ID'
                        onChange={this.handleChange}
                        value={id.value}
                        error={id.error}
                        autoFocus
                    />
                </Form>
            </Dialog>
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    refreshGame: (id: number) => dispatch(refreshGame(id)),
});

export default connect(() => ({}), mapDispatchToProps)(FormPlayGame);