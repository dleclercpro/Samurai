import React, { Dispatch } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import Home from '../pages/Home';
import Overlay from './Overlay';
import DialogTileChoice from './DialogTileChoice';
import { loadBoard } from '../actions/BoardActions';
import { BoardJSON, PlayerTileJSON } from '../types/JSONTypes';
import { AppAction } from '../actions';
import { connect } from 'react-redux';
import BoardData from '../data/Board.json';
import HandData from '../data/Hand.json';
import { loadHand, setPlayerColor } from '../actions/PlayerActions';
import { PLAYER_COLOR, HAND_SIZE } from '../config';
import Grid from './Grid';

interface DispatchProps {
    loadBoard: (data: BoardJSON) => void,
    loadHand: (data: PlayerTileJSON[]) => void,
    setPlayerColor: (color: string) => void,
}

type Props = DispatchProps;

class App extends React.Component<Props, {}> {
    
    componentDidMount() {
        const { loadBoard, loadHand, setPlayerColor } = this.props;

        loadBoard(BoardData);
        loadHand(this.getHand());
        setPlayerColor(PLAYER_COLOR);
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
                <Overlay>
                    <DialogTileChoice />
                </Overlay>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    loadBoard: (data: BoardJSON) => dispatch(loadBoard(data)),
    loadHand: (data: PlayerTileJSON[]) => dispatch(loadHand(data)),
    setPlayerColor: (color: string) => dispatch(setPlayerColor(color)),
});

export default connect(() => ({}), mapDispatchToProps)(App);