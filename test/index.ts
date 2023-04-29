import { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse } from '../src/libs/calls';
import { HttpStatusCode } from '../src/types/HTTPTypes';
import { SESSION_OPTIONS } from '../src/config/AuthConfig';
import Cookie from 'cookie';
import { exists } from '../src/libs';

interface Error {
    status: HttpStatusCode,
    data: ErrorResponse<any>,
}

const getAxiosErrorData = (err: AxiosError) => ({
    status: err.response?.status,
    data: err.response?.data,
});

const getAxiosCookies = (res: AxiosResponse) => {
    return res.headers['set-cookie'];
}

export const getSessionCookieFromAxiosResponse = (res: AxiosResponse) => {
    const cookies = getAxiosCookies(res);
    
    if (!cookies) {
        throw new Error('No cookies in response.');
    }

    const { cookie: { name }} = SESSION_OPTIONS;

    const sessionCookie = cookies
        .map(cookie => Cookie.parse(cookie))
        .find(cookie => exists(cookie[name]));

    if (!sessionCookie) {
        throw new Error('No session cookie found!');
    }

    return Cookie.serialize(name, sessionCookie[name]);
}

export const expectActionToFailWithError = async (action: () => any, error: Error) => {
    const response = action().catch(getAxiosErrorData);

    await expect(response).resolves.toEqual(error);
}