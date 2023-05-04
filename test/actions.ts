import axios from 'axios';
import { getSessionCookieFromAxiosResponse } from '.';
import { API_ROOT } from '../src/config/AppConfig';

export const signUpAction = (user: any) => axios.post(`${API_ROOT}/auth`, user).then(res => res.data);
export const signInAction = (user: any) => axios.get(`${API_ROOT}/auth/sign-in`, { data: user }).then(res => res.data);

export const signInAndGetCookieAction = async (user: any) => {
    const response = await axios.get(`${API_ROOT}/auth/sign-in`, { data: user });

    return getSessionCookieFromAxiosResponse(response);
}

export const createGameAction = async (game: any, user: any) => {
    const cookie = await signInAndGetCookieAction(user);
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