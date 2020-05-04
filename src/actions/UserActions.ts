import { SetUser, SET_USER, ResetUser, RESET_USER, SetLanguage, SET_LANGUAGE } from '../types/ActionTypes';
import { Language } from '../types/GameTypes';

export const setUser = (username: string, email: string): SetUser => ({
    type: SET_USER,
    username,
    email,
});

export const resetUser: ResetUser = {
    type: RESET_USER,
};

export const setLanguage = (language: Language): SetLanguage => ({
    type: SET_LANGUAGE,
    language,
});