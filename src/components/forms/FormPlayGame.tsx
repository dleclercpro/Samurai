import React from 'react';
import './FormPlayGame.scss';
import FormTextField from './FormTextField';
import { FormFields, INIT_FIELD_STATE } from '../../types/FormTypes';
import Form from './Form';
import { DialogType } from '../../types/DialogTypes';
import { getFormPayload } from '../../lib';
import Dialog from '../dialogs/Dialog';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const INIT_STATE = {
    fields: {
        id: { ...INIT_FIELD_STATE },
    },
    isFilled: false,
};

type Props = RouteComponentProps;

interface State {
    fields: FormFields,
    isFilled: boolean,
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
        const { history } = this.props;
        const id = parseInt(getFormPayload(this.state.fields).id);

        history.push(`/samurai/game/${id}/`);

        return Promise.resolve();
    }
    
    render() {
        const { fields, isFilled } = this.state;
        const { id } = fields;

        return (
            <Dialog
                type={DialogType.PlayGame}
                headline='Play game'
                message='Please enter the ID of the game you want to play in:'
                actionButtonText='Play'
                isActionButtonActive={isFilled}
                onAction={this.handleSubmit}
                onCancel={() => {}}
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

export default withRouter(FormPlayGame);