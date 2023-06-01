import axios from 'axios';
import { getSessionCookieFromAxiosResponse } from '..';
import { API_ROOT } from '../../src/config/AppConfig';
import CookieManager from '../helpers/CookieManager';

export const signUpAction = async (user: any) => {
    return axios
        .post(`${API_ROOT}/auth/sign-up`, user)
        .then(res => res.data);
}

export const signInAction = async (user: any) => {
    const response = await axios
        .put(`${API_ROOT}/auth/sign-in`, user);

    const cookie = getSessionCookieFromAxiosResponse(response);

    await CookieManager.setSessionCookie(cookie);

    return response.data;
}

export const signOutAction = async () => {
    const sessionCookie = await CookieManager.getSessionCookie();
    const headers = { Cookie: sessionCookie ?? undefined };
    
    const response = await axios
        .get(`${API_ROOT}/auth/sign-out`, { headers })

    await CookieManager.removeSessionCookie();

    return response.data;
}

export const pingAction = async () => {
    const sessionCookie = await CookieManager.getSessionCookie();
    const headers = { Cookie: sessionCookie ?? undefined };
    
    return axios
        .get(`${API_ROOT}/auth`, { headers })
        .then(res => res.data);
}