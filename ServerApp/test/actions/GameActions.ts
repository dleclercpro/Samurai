import axios from 'axios';
import { API_ROOT } from '../../src/config/AppConfig';
import CookieManager from '../helpers/CookieManager';

export const createGameAction = async (game: any) => {
    const sessionCookie = await CookieManager.getSessionCookie();
    const headers = { Cookie: sessionCookie };

    return axios
        .post(`${API_ROOT}/game`, game, { headers })
        .then(res => res.data);
}

export const playGameAction = async (game: any, order: any) => {
    const sessionCookie = await CookieManager.getSessionCookie();
    const headers = { Cookie: sessionCookie };

    return axios
        .post(`${API_ROOT}/game/${game}`, order, { headers })
        .then(res => res.data);
}