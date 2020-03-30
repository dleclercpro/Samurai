import { LOGIN_ACTION } from "../types/ActionTypes";

export const LoginAction = (user: string) => ({
    type: LOGIN_ACTION,
    user
})