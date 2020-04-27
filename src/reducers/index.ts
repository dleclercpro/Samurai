import { combineReducers } from 'redux';
import DialogReducer from './DialogReducer';
import { AppState } from '../types/StateTypes';
import GameReducer from './GameReducer';
import PlayersReducer from './PlayersReducer';
import DataReducer from './DataReducer';
import OverlayReducer from './OverlayReducer';
import UserReducer from './UserReducer';

const rootReducer = combineReducers<AppState>({
    game: GameReducer,
    user: UserReducer,
    players: PlayersReducer,
    data: DataReducer,
    dialog: DialogReducer,
    overlay: OverlayReducer,
});

export default rootReducer;