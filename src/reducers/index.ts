import { combineReducers } from 'redux';
import userReducer from './user';
import { AppState } from '../types/StateTypes';

const rootReducer = combineReducers<AppState>({
    user: userReducer,
});

export default rootReducer;