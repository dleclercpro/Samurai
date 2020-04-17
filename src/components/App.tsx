import React from 'react';
import './App.scss';
import DialogTileChoice from './dialogs/DialogTileChoice';
import { BoardJSON, PlayerTileJSON, PlayerJSON } from '../types/JSONTypes';
import { AppAction } from '../actions';
import { connect } from 'react-redux';
import FULL_HAND from '../data/FullHand.json';
import FAKE_BOARD from '../data/FakeBoard.json';
import FAKE_PLAYER from '../data/FakePlayer.json';
import FAKE_OPPONENTS from '../data/FakeOpponents.json';
import Grid from './Grid';
import DialogGameOver from './dialogs/DialogGameOver';
import DialogCasteSwitchStart from './dialogs/DialogCasteSwitchStart';
import { loadBoard, loadFullHand } from '../actions/DataActions';
import { loadHand, loadPlayer, loadOpponents } from '../actions/PlayerActions';
import DialogCasteChoice from './dialogs/DialogCasteChoice';
import DialogCasteSwitchEnd from './dialogs/DialogCasteSwitchEnd';
import DialogTileMoveStart from './dialogs/DialogTileMoveStart';
import DialogTileMoveEnd from './dialogs/DialogTileMoveEnd';
import { AppState } from '../types/StateTypes';
import { ColorMode } from '../types/GameTypes';
import DialogSignIn from './dialogs/DialogSignIn';
import DialogSignUp from './dialogs/DialogSignUp';
import { openDialog } from '../actions/DialogActions';
import { DialogType } from '../types/DialogTypes';
import DialogSuccess from './dialogs/DialogSuccess';
import DialogError from './dialogs/DialogError';
import { refreshGame } from '../actions/ServerActions';
import { ThunkDispatch } from 'redux-thunk';
import { getRandomHand } from '../lib';
import { setGameId } from '../actions/GameActions';

interface StateProps {
    isColorblind: boolean,
}

interface DispatchProps {
    loadBoard: (data: BoardJSON) => void,
    loadHand: (data: number[]) => void,
    loadFullHand: (data: PlayerTileJSON[]) => void,
    loadPlayer: (data: PlayerJSON) => void,
    loadOpponents: (data: PlayerJSON[]) => void,
    openSignUpDialog: () => void,
    openSignInDialog: () => void,
    setGameId: (id: number) => void,

    refreshGame: () => Promise<void>,
}

type Props = StateProps & DispatchProps;

class App extends React.Component<Props, {}> {
    
    componentDidMount() {
        const { loadFullHand, loadBoard, loadPlayer, loadOpponents, refreshGame, setGameId, openSignInDialog } = this.props;
        const game = 6;
        
        setGameId(game);
        loadFullHand(FULL_HAND);

        refreshGame()
            .catch((error: any) => {
                loadHand(getRandomHand(FULL_HAND));
                loadBoard(FAKE_BOARD);
                loadPlayer(FAKE_PLAYER);
                loadOpponents(FAKE_OPPONENTS);
            });

        openSignInDialog();
    }

    render() {
        const { isColorblind } = this.props;

        return (
            <div id='app' className={`${isColorblind ? 'is-colorblind' : ''}`}>
                <main id='main'>
                    <Grid />
                </main>
                <section id='dialogs'>
                    <DialogSuccess />
                    <DialogError />
                    <DialogSignIn />
                    <DialogSignUp />
                    <DialogGameOver />
                    <DialogTileChoice />
                    <DialogCasteChoice />
                    <DialogTileMoveStart />
                    <DialogTileMoveEnd />
                    <DialogCasteSwitchStart />
                    <DialogCasteSwitchEnd />
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    isColorblind: state.game.colors === ColorMode.Blind,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    loadBoard: (data: BoardJSON) => dispatch(loadBoard(data)),
    loadHand: (data: number[]) => dispatch(loadHand(data)),
    loadFullHand: (data: PlayerTileJSON[]) => dispatch(loadFullHand(data)),
    loadPlayer: (data: PlayerJSON) => dispatch(loadPlayer(data)),
    loadOpponents: (data: PlayerJSON[]) => dispatch(loadOpponents(data)),
    openSignUpDialog: () => dispatch(openDialog(DialogType.SignUp)),
    openSignInDialog: () => dispatch(openDialog(DialogType.SignIn)),
    setGameId: (id: number) => dispatch(setGameId(id)),

    refreshGame: () => dispatch(refreshGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);