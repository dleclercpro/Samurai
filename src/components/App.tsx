import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import Home from '../pages/Home';
import Board from './Board';
import Overlay from './Overlay';
import Dialog from './Dialog';
import BoardMap from '../data/Board.json';

interface AppProps {

}

const App = (props: AppProps) => (
    <div id='app'>
        <main id='main'>
            <Switch>
                <Route exact path='/'>
                    <Board
                        gridSize={{ width: 14, height: 14 }}
                        tileSize={{ width: 300, height: 260 }}
                        map={BoardMap}
                        origin={{ x: 9, y: -16 }}
                    />
                </Route>
                <Route exact path='/home/'>
                    <Home />
                </Route>
            </Switch>
        </main>
        <Overlay>
            <Dialog headline='Dialog'>
                <p>This is a test.</p>
            </Dialog>
        </Overlay>
    </div>
);

export default App;