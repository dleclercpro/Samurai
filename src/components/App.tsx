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
import DialogSignIn from './dialogs/DialogSignIn';
import DialogSignUp from './dialogs/DialogSignUp';
import DialogSuccess from './dialogs/DialogSuccess';
import DialogError from './dialogs/DialogError';
import { ThunkDispatch } from 'redux-thunk';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import DialogCreateGame from './dialogs/DialogCreateGame';
import Game from './Game';
import DialogPlayGame from './dialogs/DialogPlayGame';
import { PlayerTileJSON } from '../types/ServerTypes';

interface StateProps {
    isColorblind: boolean,
}

interface DispatchProps {
    loadFullHand: (data: PlayerTileJSON[]) => void,
}

type Props = StateProps & DispatchProps;

class App extends React.Component<Props, {}> {
    
    componentDidMount() {
        const { loadFullHand } = this.props;
        
        loadFullHand(FULL_HAND);
    }

    render() {
        const { isColorblind } = this.props;

        return (
            <div id='app' className={`${isColorblind ? 'is-colorblind' : ''}`}>           
                <main id='main'>
                    <Switch>
                        <Route exact path='/'>
                            <Home />
                        </Route>
                        <Route exact path='/samurai/game/:id/' render={({ match }) => (
                            <Game id={parseInt(match.params.id)} />
                        )} />
                        <Route>
                            <Redirect to='/' />
                        </Route>
                    </Switch>
                </main>

                <section id='dialogs'>
                    <DialogSuccess />
                    <DialogError />
                    <DialogSignIn />
                    <DialogSignUp />
                    <DialogPlayGame />
                    <DialogCreateGame />
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
    loadFullHand: (data: PlayerTileJSON[]) => dispatch(loadFullHand(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);