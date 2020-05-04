import { UserState } from '../types/StateTypes';
import { UserAction } from '../actions';
import { SET_USER, RESET_USER, SET_LANGUAGE } from '../types/ActionTypes';
import { Language } from '../types/GameTypes';
import i18n from '../i18n';
import { localStorageGet, localStorageSet } from '../lib';

const language = localStorageGet('language') as Language;

const initState = {
    username: '',
    email: '',
    isAuthenticated: false,
    language: new i18n(language ? language : Language.EN),
};

const UserReducer = (state: UserState = initState, action: UserAction) => {
    switch (action.type) {
        case RESET_USER:
            return { ...initState };
        case SET_USER:
            return {
                ...state,
                username: action.username,
                email: action.email,
                isAuthenticated: true,
            };
        case SET_LANGUAGE:
            localStorageSet('language', action.language);

            return {
                ...state,
                language: new i18n(action.language),
            };
        default:
            return state;
    }
};

export default UserReducer;