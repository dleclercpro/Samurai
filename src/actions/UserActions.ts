import { SignIn, SIGN_IN, SignOut, SIGN_OUT } from '../types/ActionTypes';

export const signIn = (username: string, email: string): SignIn => ({
    type: SIGN_IN,
    username,
    email,
});

export const signOut: SignOut = {
    type: SIGN_OUT,
};