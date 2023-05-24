import { SetUser, SET_USER, ResetUser, RESET_USER } from '../types/ActionTypes';

export const setUser = (username: string, email: string, isAdmin: boolean): SetUser => ({
    type: SET_USER,
    username,
    email,
    isAdmin,
});

export const resetUser: ResetUser = {
    type: RESET_USER,
};