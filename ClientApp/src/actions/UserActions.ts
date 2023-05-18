import { SetUser, SET_USER, ResetUser, RESET_USER } from '../types/ActionTypes';

export const setUser = (username: string, email: string): SetUser => ({
    type: SET_USER,
    username,
    email,
});

export const resetUser: ResetUser = {
    type: RESET_USER,
};