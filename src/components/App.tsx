import React, { Dispatch } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import Home from '../pages/Home';
import DialogTileChoice from './DialogTileChoice';
import { loadBoard } from '../actions/BoardActions';
import { BoardJSON, PlayerTileJSON, PlayerJSON } from '../types/JSONTypes';
import { AppAction } from '../actions';
import { connect } from 'react-redux';
import BoardData from '../data/Board.json';
import HandData from '../data/Hand.json';
import { loadHand, loadPlayer, loadOpponents } from '../actions/PlayerActions';
import { HAND_SIZE, PLAYER, OPPONENTS } from '../config';
import Grid from './Grid';

interface DispatchProps {
    loadBoard: (data: BoardJSON) => void,
    loadHand: (data: PlayerTileJSON[]) => void,
    loadPlayer: (data: PlayerJSON) => void,
    loadOpponents: (data: PlayerJSON[]) => void,
}

type Props = DispatchProps;

class App extends React.Component<Props, {}> {
    
    componentDidMount() {
        const { loadBoard, loadHand, loadPlayer, loadOpponents } = this.props;

        loadBoard(BoardData);
        loadHand(this.getHand());
        loadPlayer(PLAYER);
        loadOpponents(OPPONENTS);
    }

    getHand = () => {

        // Simulate random 5 tiles in hand
        const randomIndexes = new Set<number>();

        while (randomIndexes.size < HAND_SIZE) {
            const i = Math.floor(Math.random() * HandData.length);
            
            if (!randomIndexes.has(i)) {
                randomIndexes.add(i);
            }
        }

        return [ ...randomIndexes ].map((i: number) => HandData[i]);
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
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    loadBoard: (data: BoardJSON) => dispatch(loadBoard(data)),
    loadHand: (data: PlayerTileJSON[]) => dispatch(loadHand(data)),
    loadPlayer: (data: PlayerJSON) => dispatch(loadPlayer(data)),
    loadOpponents: (data: PlayerJSON[]) => dispatch(loadOpponents(data)),
});

export default connect(() => ({}), mapDispatchToProps)(App);