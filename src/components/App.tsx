import React, { Dispatch } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import Home from '../pages/Home';
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
import DialogCasteSwitch from './dialogs/DialogCasteSwitch';
import { loadBoard, loadInitHand } from '../actions/DataActions';
import { loadHand, loadPlayer, loadOpponents } from '../actions/PlayerActions';

interface DispatchProps {
    loadBoard: (data: BoardJSON) => void,
    loadHand: (data: number[]) => void,
    loadInitHand: (data: PlayerTileJSON[]) => void,
    loadPlayer: (data: PlayerJSON) => void,
    loadOpponents: (data: PlayerJSON[]) => void,
}

type Props = DispatchProps;

class App extends React.Component<Props, {}> {
    
    componentDidMount() {
        const { loadBoard, loadHand, loadInitHand, loadPlayer, loadOpponents } = this.props;

        loadBoard(BOARD);
        loadInitHand(HAND);
        loadHand(this.getHand());
        loadPlayer(PLAYER);
        loadOpponents(OPPONENTS);
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
        return (
            <div id='app'>
                <main id='main'>
                    <Switch>
                        <Route exact path='/'>
                            <Grid />
                        </Route>
                        <Route exact path='/home/'>
                            <Home />
                        </Route>
                    </Switch>
                </main>
                <DialogTileChoice />
                <DialogCasteSwitch />
                <DialogGameOver />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    loadBoard: (data: BoardJSON) => dispatch(loadBoard(data)),
    loadHand: (data: number[]) => dispatch(loadHand(data)),
    loadInitHand: (data: PlayerTileJSON[]) => dispatch(loadInitHand(data)),
    loadPlayer: (data: PlayerJSON) => dispatch(loadPlayer(data)),
    loadOpponents: (data: PlayerJSON[]) => dispatch(loadOpponents(data)),
});

export default connect(() => ({}), mapDispatchToProps)(App);