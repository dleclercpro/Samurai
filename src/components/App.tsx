import React, { Dispatch } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import Home from '../pages/Home';
import Board from './Board';
import Overlay from './Overlay';
import DialogTileChoice from './DialogTileChoice';
import { loadBoard } from '../actions/BoardActions';
import { BoardJSON, PlayerTileJSON } from '../types/JSONTypes';
import { AppAction } from '../actions';
import { connect } from 'react-redux';
import BoardData from '../data/Board.json';
import HandData from '../data/Hand.json';
import { loadHand, setPlayerColor } from '../actions/PlayerActions';

const GRID_SIZE = { width: 14, height: 14 };
const TILE_SIZE = { width: 300, height: 260 };
const TILE_STROKE = 12;
const ROTATION = 60;
const PLAYER_COLOR = 'red';
const HAND_SIZE = 5;

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

        // Simulate random 5 tiles in hand
        const randomIndexes = new Set<number>();
        
        while (randomIndexes.size < HAND_SIZE) {
            const i = Math.floor(Math.random() * HandData.length);
            
            if (!randomIndexes.has(i)) {
                randomIndexes.add(i);
            }
        }

        loadHand([ ...randomIndexes ].map((i: number) => HandData[i]));

        setPlayerColor(PLAYER_COLOR);
    }

    render() {
        return (
            <div id='app'>
                <main id='main'>
                    <Switch>
                        <Route exact path='/'>
                            <Board
                                gridSize={GRID_SIZE}
                                tileSize={TILE_SIZE}
                                tileStroke={TILE_STROKE}
                                rotation={ROTATION}
                            />
                        </Route>
                        <Route exact path='/home/'>
                            <Home />
                        </Route>
                    </Switch>
                </main>
                <Overlay>
                    <DialogTileChoice tileSize={TILE_SIZE} tileStroke={TILE_STROKE} />
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