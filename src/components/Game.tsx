import React from 'react';
import './Game.scss';
import Grid from './Grid';
import { setGameId } from '../actions/GameActions';
import { AppAction } from '../actions';
import { connect } from 'react-redux';
import { refreshGame } from '../actions/ServerActions';
import { BoardJSON } from '../types/ServerTypes';
import { loadBoard } from '../actions/DataActions';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../types/StateTypes';
import { DialogType } from '../types/DialogTypes';
import { setErrorDialog, openDialog } from '../actions/DialogActions';

interface OwnProps {
    id: number,
}

interface DispatchProps {
    setGameId: (id: number) => void,
    loadBoard: (data: BoardJSON) => void,
    setErrorDialog: (message: string, explanation: string) => void,
    openErrorDialog: () => void,

    refreshGame: () => Promise<void>,
}

type Props = OwnProps & DispatchProps;

class Game extends React.Component<Props, {}> {

    componentDidMount() {
        const { id, setGameId, refreshGame, setErrorDialog, openErrorDialog } = this.props;

        setGameId(id);

        refreshGame()
            .catch((error: any) => {
                setErrorDialog(`There was a problem loading the game with ID: ${id}`, error.message);
                openErrorDialog();
            });
    }

    render() {
        return (
            <Grid />
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    setGameId: (id: number) => dispatch(setGameId(id)),
    loadBoard: (data: BoardJSON) => dispatch(loadBoard(data)),
    setErrorDialog: (message: string, explanation: string) => dispatch(setErrorDialog(message, explanation)),
    openErrorDialog: () => dispatch(openDialog(DialogType.Error)),

    refreshGame: () => dispatch(refreshGame()),
});

export default connect(() => ({}), mapDispatchToProps)(Game);