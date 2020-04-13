import React, { Dispatch } from 'react';
import './App.scss';
import DialogTileChoice from './dialogs/DialogTileChoice';
import { BoardJSON, PlayerTileJSON, PlayerJSON } from '../types/JSONTypes';
import { AppAction } from '../actions';
import { connect } from 'react-redux';
import BOARD from '../data/Board.json';
import HAND from '../data/Hand.json';
import PLAYER from '../data/Player.json';
import OPPONENTS from '../data/Opponents.json';
import { HAND_SIZE } from '../config';
import Grid from './Grid';
import DialogGameOver from './dialogs/DialogGameOver';
import DialogCasteSwitchStart from './dialogs/DialogCasteSwitchStart';
import { loadBoard, loadInitHand } from '../actions/DataActions';
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

interface StateProps {
    isColorblind: boolean,
}

interface DispatchProps {
    loadBoard: (data: BoardJSON) => void,
    loadHand: (data: number[]) => void,
    loadInitHand: (data: PlayerTileJSON[]) => void,
    loadPlayer: (data: PlayerJSON) => void,
    loadOpponents: (data: PlayerJSON[]) => void,
    openSignUpDialog: () => void,
    openSignInDialog: () => void,
}

type Props = StateProps & DispatchProps;

class App extends React.Component<Props, {}> {
    
    componentDidMount() {
        const { loadBoard, loadHand, loadInitHand, loadPlayer, loadOpponents, openSignInDialog } = this.props;

        loadBoard(BOARD);
        loadInitHand(HAND);
        loadHand(this.getHand());
        loadPlayer(PLAYER);
        loadOpponents(OPPONENTS);

        openSignInDialog();
    }

    getHand = () => {
        const randomIndexes = new Set<number>();

        while (randomIndexes.size < HAND_SIZE) {
            const i = Math.floor(Math.random() * HAND.length);
            
            if (!randomIndexes.has(i)) {
                randomIndexes.add(i);
            }
        }

        return [ ...randomIndexes ];
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

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    loadBoard: (data: BoardJSON) => dispatch(loadBoard(data)),
    loadHand: (data: number[]) => dispatch(loadHand(data)),
    loadInitHand: (data: PlayerTileJSON[]) => dispatch(loadInitHand(data)),
    loadPlayer: (data: PlayerJSON) => dispatch(loadPlayer(data)),
    loadOpponents: (data: PlayerJSON[]) => dispatch(loadOpponents(data)),
    openSignUpDialog: () => dispatch(openDialog(DialogType.SignUp)),
    openSignInDialog: () => dispatch(openDialog(DialogType.SignIn)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);