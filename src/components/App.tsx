import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import Home from '../pages/Home';
import Board from './Board';
import Overlay from './Overlay';
import BoardJSON from '../data/Board.json';
import DialogPlayerTileChoice from './DialogPlayerTileChoice';

interface AppProps {

}

const GRID_SIZE = { width: 14, height: 14 };
const TILE_SIZE = { width: 300, height: 260 };
const TILE_STROKE = 12;
const ORIGIN = { x: 12, y: -16 };
const ROTATION = 60;

const App = (props: AppProps) => (
    <div id='app'>
        <main id='main'>
            <Switch>
                <Route exact path='/'>
                    <Board
                        gridSize={GRID_SIZE}
                        tileSize={TILE_SIZE}
                        tileStroke={TILE_STROKE}
                        origin={ORIGIN}
                        rotation={ROTATION}
                        data={BoardJSON}
                    />
                </Route>
                <Route exact path='/home/'>
                    <Home />
                </Route>
            </Switch>
        </main>
        <Overlay>
            <DialogPlayerTileChoice tileSize={TILE_SIZE} tileStroke={TILE_STROKE} />
        </Overlay>
    </div>
);

export default App;