import React from 'react';
import './FormPlayGame.scss';
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
import { Redirect } from 'react-router-dom';

const INIT_STATE = {
    fields: {
        id: { ...INIT_FIELD_STATE },
    },
    isFilled: false,
    gameToPlay: -1,
};

interface DispatchProps {
    close: () => void,
}

type Props = DispatchProps;

interface State {
    fields: FormFields,
    isFilled: boolean,
    gameToPlay: number,
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

    handleSubmit = (e: React.FormEvent) => {
        const { id } = getFormPayload(this.state.fields);

        e.preventDefault();

        this.setState({
            gameToPlay: parseInt(id),
        });

    }
    
    render() {
        const { close } = this.props;
        const { fields, isFilled, gameToPlay } = this.state;
        const { id } = fields;

        if (gameToPlay >= 0) {

            return (
                <Redirect to={`/samurai/game/${gameToPlay}/`} />
            );
        }

        return (
            <Form
                id='play-game'
                submitText='Play'
                onCancel={close}
                onSubmit={this.handleSubmit}
                canSubmit={isFilled}
            >
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
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    close: () => dispatch(closeDialog(DialogType.PlayGame)),
});

export default connect(() => ({}), mapDispatchToProps)(FormPlayGame);