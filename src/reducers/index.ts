import { combineReducers } from 'redux';
import DialogReducer from './DialogReducer';
import { AppState } from '../types/StateTypes';
import GameReducer from './GameReducer';
import BoardReducer from './BoardReducer';

const rootReducer = combineReducers<AppState>({
    game: GameReducer,
    board: BoardReducer,
    dialog: DialogReducer,
});

export default rootReducer;