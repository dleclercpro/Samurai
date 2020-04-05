import { combineReducers } from 'redux';
import DialogReducer from './DialogReducer';
import { AppState } from '../types/StateTypes';
import PlayerReducer from './PlayerReducer';
import BoardReducer from './BoardReducer';

const rootReducer = combineReducers<AppState>({
    player: PlayerReducer,
    board: BoardReducer,
    dialog: DialogReducer,
});

export default rootReducer;