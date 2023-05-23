import axios from 'axios';
import { getSessionCookieFromAxiosResponse } from '..';
import { API_ROOT } from '../../src/config/AppConfig';

export const signUpAction = (user: any) => axios.post(`${API_ROOT}/auth/sign-up`, user).then(res => res.data);
export const signInAction = (user: any) => axios.put(`${API_ROOT}/auth/sign-in`, user).then(res => res.data);

export const pingAction = async (cookie?: any) => {
    const headers = { Cookie: cookie };
    
    return axios
        .get(`${API_ROOT}/auth`, { headers })
        .then(res => res.data);
}

export const signInAndGetCookieAction = async (user: any) => {
    const response = await axios.put(`${API_ROOT}/auth/sign-in`, user);

    return getSessionCookieFromAxiosResponse(response);
}