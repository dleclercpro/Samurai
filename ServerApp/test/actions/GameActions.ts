import axios from 'axios';
import { API_ROOT } from '../../src/config/AppConfig';
import { signInAndGetCookieAction } from './AuthActions';

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