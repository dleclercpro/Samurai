import axios from 'axios';
import { getSessionCookieFromAxiosResponse } from '.';
import { API_ROOT } from '../src/config/AppConfig';

export const signUpAction = (user: any) => axios.post(`${API_ROOT}/auth/sign-up`, user).then(res => res.data);
export const signInAction = (user: any) => axios.put(`${API_ROOT}/auth/sign-in`, user).then(res => res.data);

export const signInAndGetCookieAction = async (user: any) => {
    const response = await axios.put(`${API_ROOT}/auth/sign-in`, user);

    return getSessionCookieFromAxiosResponse(response);
}

export const signInAndCreateGameAction = async (game: any, user: any) => {
    const cookie = await signInAndGetCookieAction(user);

    return createGameAction(game, cookie);
}

export const createGameAction = async (game: any, cookie: any) => {
    const headers = { Cookie: cookie };

    return axios
        .post(`${API_ROOT}/game`, game, { headers })
        .then(res => res.data);
}

export const playGameAction = async (game: any, order: any, user: any) => {
    const cookie = await signInAndGetCookieAction(user);
    const headers = { Cookie: cookie };

    return axios
        .post(`${API_ROOT}/game/${game}`, order, { headers })
        .then(res => res.data);
}