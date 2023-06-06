import axios from 'axios';
import { API_ROOT } from '../../src/config/AppConfig';
import CookieManager from '../../src/helpers/CookieManager';

export const createGameAction = async (game: any) => {
    const sessionCookie = await CookieManager.getSessionCookie();
    const headers = { Cookie: sessionCookie };

    return axios
        .post(`${API_ROOT}/game`, game, { headers })
        .then(res => res.data);
}

export const playGameAction = async (id: string, order: any) => {
    const sessionCookie = await CookieManager.getSessionCookie();
    const headers = { Cookie: sessionCookie };

    return axios
        .post(`${API_ROOT}/game/${id}`, order, { headers })
        .then(res => res.data);
}

export const getGameDataAction = async (id: string, version: number = 0) => {
    const sessionCookie = await CookieManager.getSessionCookie();
    const headers = { Cookie: sessionCookie };

    return axios
        .get(`${API_ROOT}/game/${id}/${version}`, { headers })
        .then(res => res.data);
}