import React from 'react';
import './Game.scss';
import Grid from './Grid';
import { setGameId } from '../actions/GameActions';
import { AppAction } from '../actions';
import { connect } from 'react-redux';
import { refreshGame } from '../actions/ServerActions';
import { PlayerJSON, BoardJSON } from '../types/JSONTypes';
import { loadBoard } from '../actions/DataActions';
import { loadHand, loadPlayer, loadOpponents } from '../actions/PlayerActions';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../types/StateTypes';
import { getRandomHand } from '../lib';
import FULL_HAND from '../data/FullHand.json';
import FAKE_BOARD from '../data/FakeBoard.json';
import FAKE_PLAYER from '../data/FakePlayer.json';
import FAKE_OPPONENTS from '../data/FakeOpponents.json';
import { DialogType } from '../types/DialogTypes';
import { closeDialog } from '../actions/DialogActions';

interface OwnProps {
    id: number,
}

interface DispatchProps {
    loadBoard: (data: BoardJSON) => void,
    loadHand: (data: number[]) => void,
    loadPlayer: (data: PlayerJSON) => void,
    loadOpponents: (data: PlayerJSON[]) => void,
    setGameId: (id: number) => void,
    closePlayGameDialog: () => void,

    refreshGame: () => Promise<void>,
}

type Props = OwnProps & DispatchProps;

class Game extends React.Component<Props, {}> {

    componentDidMount() {
        const { id, setGameId, closePlayGameDialog, refreshGame, loadHand, loadBoard, loadPlayer, loadOpponents } = this.props;

        closePlayGameDialog();

        setGameId(id);

        refreshGame()
            .catch(() => {
                loadHand(getRandomHand(FULL_HAND));
                loadBoard(FAKE_BOARD);
                loadPlayer(FAKE_PLAYER);
                loadOpponents(FAKE_OPPONENTS);
            });
    }

    render() {
        return (
            <Grid />
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    loadBoard: (data: BoardJSON) => dispatch(loadBoard(data)),
    loadHand: (data: number[]) => dispatch(loadHand(data)),
    loadPlayer: (data: PlayerJSON) => dispatch(loadPlayer(data)),
    loadOpponents: (data: PlayerJSON[]) => dispatch(loadOpponents(data)),
    setGameId: (id: number) => dispatch(setGameId(id)),
    closePlayGameDialog: () => dispatch(closeDialog(DialogType.PlayGame)),

    refreshGame: () => dispatch(refreshGame()),
});

export default connect(() => ({}), mapDispatchToProps)(Game);