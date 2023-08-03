import { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse } from '../src/utils/calls';
import { HttpStatusCode } from '../src/types/HTTPTypes';
import { SESSION_OPTIONS } from '../src/config/AuthConfig';
import Cookie from 'cookie';
import TestDatabase from '../src/databases/TestDatabase';
import { start, stop } from '../src/app';
import { exists } from '../src/utils';



interface Error {
    status: HttpStatusCode,
    data: ErrorResponse<any>,
}



export const defaultBeforeAll = async () => {
    await start();
}

export const defaultBeforeEach = async () => {

}

export const defaultAfterAll = async () => {
    await TestDatabase.drop();

    await stop();
}

export const defaultAfterEach = async () => {
    await TestDatabase.dropCollections();
}



const getAxiosCookies = (res: AxiosResponse) => {
    return res.headers['set-cookie'];
}

const getAxiosErrorData = (err: AxiosError) => ({
    status: err.response?.status,
    data: err.response?.data,
});

export const getSessionCookieFromAxiosResponse = (res: AxiosResponse) => {
    const cookies = getAxiosCookies(res);
    
    if (!cookies) {
        throw new Error('No cookies in response.');
    }

    const { cookie: { name } } = SESSION_OPTIONS;

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