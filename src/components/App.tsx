import React from 'react';
import './App.scss';
import DialogTileChoice from './dialogs/DialogTileChoice';
import { AppAction } from '../actions';
import { connect } from 'react-redux';
import FULL_HAND from '../data/FullHand.json';
import DialogGameOver from './dialogs/DialogGameOver';
import DialogCasteSwitchStart from './dialogs/DialogCasteSwitchStart';
import { loadFullHand } from '../actions/DataActions';
import DialogCasteChoice from './dialogs/DialogCasteChoice';
import DialogCasteSwitchEnd from './dialogs/DialogCasteSwitchEnd';
import DialogTileMoveStart from './dialogs/DialogTileMoveStart';
import DialogTileMoveEnd from './dialogs/DialogTileMoveEnd';
import { AppState } from '../types/StateTypes';
import { ColorMode } from '../types/GameTypes';
import DialogSuccess from './dialogs/DialogSuccess';
import DialogError from './dialogs/DialogError';
import { ThunkDispatch } from 'redux-thunk';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import Game from './Game';
import { PlayerTileJSON } from '../types/ServerTypes';
import FormSignIn from './forms/FormSignIn';
import FormSignUp from './forms/FormSignUp';
import FormPlayGame from './forms/FormPlayGame';
import FormCreateGame from './forms/FormCreateGame';
import { verifyAuthentication } from '../actions/ServerActions';

interface StateProps {
    isColorblind: boolean,
}

interface DispatchProps {
    verifyAuthentication: () => Promise<void>,
    loadFullHand: (data: PlayerTileJSON[]) => void,
}

type Props = StateProps & DispatchProps;

class App extends React.Component<Props, {}> {
    
    componentDidMount() {
        const { verifyAuthentication, loadFullHand } = this.props;

        verifyAuthentication();
        
        loadFullHand(FULL_HAND);
    }

    render() {
        const { isColorblind } = this.props;

        return (
            <div id='app' className={`${isColorblind ? 'is-colorblind' : ''}`}>           
                <main id='main'>
                    <Switch>
                        <Route exact path='/samurai/'>
                            <Home />
                        </Route>
                        <Route exact path='/samurai/game/'>
                            <Game />
                        </Route>
                        <Route>
                            <Redirect to='/samurai/' />
                        </Route>
                    </Switch>
                </main>

                <section id='dialogs'>
                    <DialogSuccess />
                    <DialogError />
                    <DialogGameOver />
                    <DialogTileChoice />
                    <DialogCasteChoice />
                    <DialogTileMoveStart />
                    <DialogTileMoveEnd />
                    <DialogCasteSwitchStart />
                    <DialogCasteSwitchEnd />
                </section>

                <section id='forms'>
                    <FormSignIn />
                    <FormSignUp />
                    <FormPlayGame />
                    <FormCreateGame />
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    isColorblind: state.game.colors === ColorMode.Blind,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    verifyAuthentication: () => dispatch(verifyAuthentication()),
    loadFullHand: (data: PlayerTileJSON[]) => dispatch(loadFullHand(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);