import axios from 'axios';
import { start, stop } from '../src/app';
import { API_ROOT } from '../src/config/AppConfig';
import TestDatabase from '../src/databases/TestDatabase';
import { expectActionToFailWithError, getSessionCookieFromAxiosResponse } from '.';
import { HttpStatusCode, HttpStatusMessage } from '../src/types/HTTPTypes';
import { errorResponse } from '../src/libs/calls';
import { ClientError } from '../src/errors/ClientErrors';

const USER_1 = { email: 'user1@test.com', password: 'q12345678!' };
const USER_2 = { email: 'user2@test.com', password: 'q12345678!' };
const USER_3 = { email: 'user3@test.com', password: 'q12345678!' };
const USER_4 = { email: 'user4@test.com', password: 'q12345678!' };

const CREATOR = USER_1;
const OPPONENTS = [USER_2, USER_3, USER_4];
const USERS = [CREATOR, ...OPPONENTS];
const NON_EXISTING_USER = { email: 'user0@test.com', password: 'q87654321!' };

beforeAll(async () => {
    await start();
});

beforeEach(async () => {
    await Promise.all(USERS.map(async (user) => {
        await signUpAction(user);
    }));
});

afterAll(async () => {
    await TestDatabase.drop();

    await stop();
});

afterEach(async () => {
    await TestDatabase.dropCollections();
});



const signUpAction = (user: any) => axios.post(`${API_ROOT}/auth`, user);

const signInAction = async (user: any) => {
    const response = await axios.get(`${API_ROOT}/auth/sign-in`, { data: user });

    return getSessionCookieFromAxiosResponse(response);
}

const createGameAction = async (game: any, user: any) => {
    const cookie = await signInAction(user);

    return axios.post(`${API_ROOT}/game`, game, {
        headers: { Cookie: cookie },
   });
}



test(`Creating game with existing user should work`, async () => {
    const game = { name: 'Game', opponentEmails: OPPONENTS.map(opponent => opponent.email) };
    const user = { ...CREATOR, staySignedIn: false };
    
    const { code, data } = await createGameAction(game, user).then(res => res.data);

    expect(code).toEqual(0);
    expect(data.id).toBeDefined();
});

test(`Creating game with non-existing creator should not work`, async () => {
    const game = { name: 'Game', opponentEmails: OPPONENTS.map(opponent => opponent.email) };
    const user = { ...NON_EXISTING_USER, staySignedIn: false };
    
    await expectActionToFailWithError(() => createGameAction(game, user), {
        status: HttpStatusCode.FORBIDDEN,
        data: errorResponse(ClientError.InvalidCredentials),
    });
});

test(`Creating game with non-existing opponent should not work`, async () => {
    const game = { name: 'Game', opponentEmails: [NON_EXISTING_USER].map(opponent => opponent.email) };
    const user = { ...CREATOR, staySignedIn: false };
    
    await expectActionToFailWithError(() => createGameAction(game, user), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST),
    });
});

test(`Creating game with duplicate opponents should not work`, async () => {
    const game = { name: 'Game', opponentEmails: [OPPONENTS[0], OPPONENTS[0]].map(opponent => opponent.email) };
    const user = { ...CREATOR, staySignedIn: false };
    
    await expectActionToFailWithError(() => createGameAction(game, user), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST),
    });
});