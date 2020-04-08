import { combineReducers } from 'redux';
import DialogReducer from './DialogReducer';
import { AppState } from '../types/StateTypes';
import GameReducer from './GameReducer';
import PlayerReducer from './PlayerReducer';
import DataReducer from './DataReducer';

const rootReducer = combineReducers<AppState>({
    game: GameReducer,
    player: PlayerReducer,
    data: DataReducer,
    dialog: DialogReducer,
});

export default rootReducer;