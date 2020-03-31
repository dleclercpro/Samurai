import { combineReducers } from 'redux';
import DialogReducer from './DialogReducer';
import { AppState } from '../types/StateTypes';

const rootReducer = combineReducers<AppState>({
    dialog: DialogReducer,
});

export default rootReducer;