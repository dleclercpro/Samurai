import React, { Dispatch } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import Home from '../pages/Home';
import DialogTileChoice from './DialogTileChoice';
import { loadBoard } from '../actions/BoardActions';
import { BoardJSON, PlayerTileJSON, PlayerJSON } from '../types/JSONTypes';
import { AppAction } from '../actions';
import { connect } from 'react-redux';
import BOARD from '../data/Board.json';
import HAND from '../data/Hand.json';
import PLAYER from '../data/Player.json';
import OPPONENTS from '../data/Opponents.json';
import { loadHand, loadPlayer, loadOpponents, loadInitHand } from '../actions/GameActions';
import { HAND_SIZE } from '../config';
import Grid from './Grid';
import DialogGameOver from './DialogGameOver';

interface DispatchProps {
    loadBoard: (data: BoardJSON) => void,
    loadHand: (data: PlayerTileJSON[]) => void,
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

        // Simulate random 5 tiles in hand
        const randomIndexes = new Set<number>();

        while (randomIndexes.size < HAND_SIZE) {
            const i = Math.floor(Math.random() * HAND.length);
            
            if (!randomIndexes.has(i)) {
                randomIndexes.add(i);
            }
        }

        return [ ...randomIndexes ].map((i: number) => HAND[i]);
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
                <DialogGameOver />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    loadBoard: (data: BoardJSON) => dispatch(loadBoard(data)),
    loadHand: (data: PlayerTileJSON[]) => dispatch(loadHand(data)),
    loadInitHand: (data: PlayerTileJSON[]) => dispatch(loadInitHand(data)),
    loadPlayer: (data: PlayerJSON) => dispatch(loadPlayer(data)),
    loadOpponents: (data: PlayerJSON[]) => dispatch(loadOpponents(data)),
});

export default connect(() => ({}), mapDispatchToProps)(App);