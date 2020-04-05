import React, { Dispatch } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import Home from '../pages/Home';
import Board from './Board';
import Overlay from './Overlay';
import DialogPlayerTileChoice from './DialogPlayerTileChoice';
import { PlayerColor } from '../types/GameTypes';
import { loadBoard } from '../actions/BoardActions';
import { BoardJSON } from '../types/JSONTypes';
import { AppAction } from '../actions';
import { connect } from 'react-redux';
import BoardData from '../data/Board.json';

const GRID_SIZE = { width: 14, height: 14 };
const TILE_SIZE = { width: 300, height: 260 };
const TILE_STROKE = 12;
const ROTATION = 60;

interface DispatchProps {
    loadBoard: (data: BoardJSON) => void,
}

type Props = DispatchProps;

class App extends React.Component<Props, {}> {
    
    componentDidMount() {
        const { loadBoard } = this.props;

        loadBoard(BoardData);
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
                    <DialogPlayerTileChoice tileSize={TILE_SIZE} tileStroke={TILE_STROKE} tileColor={PlayerColor.Red} />
                </Overlay>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    loadBoard: (data: BoardJSON) => dispatch(loadBoard(data)),
});

export default connect(() => ({}), mapDispatchToProps)(App);