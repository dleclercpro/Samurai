export const LOGIN_ACTION = 'LOGIN_ACTION';

export interface LoginAction {
    type: typeof LOGIN_ACTION,
    user: string,
};

export type UserAction = LoginAction;

// Root action
export type AppAction = UserAction;