import { combineReducers } from 'redux';
import DialogReducer from './DialogReducer';
import { AppState } from '../types/StateTypes';
import GameReducer from './GameReducer';
import PlayersReducer from './PlayersReducer';
import UserReducer from './UserReducer';
import HandReducer from './HandReducer';
import BoardReducer from './BoardReducer';
import SettingsReducer from './SettingsReducer';

const rootReducer = combineReducers<AppState>({
    game: GameReducer,
    user: UserReducer,
    players: PlayersReducer,
    hand: HandReducer,
    board: BoardReducer,
    dialog: DialogReducer,
    settings: SettingsReducer,
});

export default rootReducer;