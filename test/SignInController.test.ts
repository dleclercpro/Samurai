import axios from 'axios';
import { start, stop } from '../src/app';
import { API_ROOT } from '../src/config/AppConfig';
import { errorResponse, successResponse } from '../src/libs/calls';
import TestDatabase from '../src/databases/TestDatabase';
import { ClientError } from '../src/errors/ClientErrors';
import { HttpStatusCode, HttpStatusMessage } from '../src/types/HTTPTypes';
import { expectActionToFailWithError } from '.';

const USER = { email: 'user1@test.com', password: 'q12345678!' };
const NON_EXISTENT_USER = { email: 'user2@test.com', password: 'q87654321!' };

beforeAll(async () => {
    await start();
});

beforeEach(async () => {
    await signUpAction(USER);
});

afterAll(async () => {
    await TestDatabase.drop();

    await stop();
});

afterEach(async () => {
    await TestDatabase.dropCollections();
});



const signUpAction = (user: any) => axios.post(`${API_ROOT}/auth`, user);
const signInAction = (user: any) => axios.get(`${API_ROOT}/auth/sign-in`, { data: user });



test(`Signing in with valid credentials should work`, async () => {
    const user = { ...USER, staySignedIn: false };
    
    const response = signInAction(user).then(res => res.data);

    await expect(response).resolves.toEqual(successResponse());
});

test(`Signing in with wrong password should not work`, async () => {
    const user = { ...USER, password: 'XXX', staySignedIn: false };

    await expectActionToFailWithError(() => signInAction(user), {
        status: HttpStatusCode.FORBIDDEN,
        data: errorResponse(ClientError.InvalidCredentials),
    });
});

test(`Signing in with missing parameters should not work`, async () => {
    await expectActionToFailWithError(() => signInAction({ password: USER.password, staySignedIn: false }), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST),
    });

    await expectActionToFailWithError(() => signInAction({ email: USER.email, staySignedIn: false }), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST),
    });

    await expectActionToFailWithError(() => signInAction(USER), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST),
    });
});

test(`Signing in with non-existent user should not work`, async () => {
    const user = { ...NON_EXISTENT_USER, staySignedIn: false };

    await expectActionToFailWithError(() => signInAction(user), {
        status: HttpStatusCode.FORBIDDEN,
        data: errorResponse(ClientError.InvalidCredentials),
    });
});