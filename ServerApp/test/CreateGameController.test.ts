import { start, stop } from '../src/app';
import TestDatabase from '../src/databases/TestDatabase';
import { expectActionToFailWithError } from '.';
import { HttpStatusCode, HttpStatusMessage } from '../src/types/HTTPTypes';
import { errorResponse } from '../src/libs/calls';
import { ClientError } from '../src/errors/ClientErrors';
import { signUpAction, signInAndCreateGameAction, createGameAction } from './actions';

const USER_1 = { email: 'user1@test.com', password: 'q12345678!', username: 'User1' };
const USER_2 = { email: 'user2@test.com', password: 'q12345678!', username: 'User2' };
const USER_3 = { email: 'user3@test.com', password: 'q12345678!', username: 'User3' };
const USER_4 = { email: 'user4@test.com', password: 'q12345678!', username: 'User4' };
const USER_5 = { email: 'user5@test.com', password: 'q12345678!', username: 'User5' };
const NON_EXISTING_USER = { email: 'user0@test.com', password: 'q87654321!', username: 'NonExistingUser' };

const CREATOR = USER_1;
const OPPONENTS = [USER_2, USER_3, USER_4];
const EXTRA_USER = USER_5;
const USERS = [CREATOR, ...OPPONENTS, EXTRA_USER];

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



test(`Creating game with existing user should work`, async () => {
    const game = { name: 'Game', opponents: OPPONENTS.map(opponent => opponent.email) };
    const user = {
        email: CREATOR.email,
        password: CREATOR.password,
        staySignedIn: false,
    };
    
    const { code, data } = await signInAndCreateGameAction(game, user);

    expect(code).toEqual(0);
    expect(data.id).toBeDefined();
});



test(`Creating game without session cookie should not work`, async () => {
    const game = { name: 'Game', opponents: OPPONENTS.map(opponent => opponent.email) };
    
    await expectActionToFailWithError(() => createGameAction(game, null), {
        status: HttpStatusCode.UNAUTHORIZED,
        data: errorResponse(ClientError.InvalidCredentials),
    });
});



test(`Creating game with non-existing user should not work`, async () => {
    const game = { name: 'Game', opponents: OPPONENTS.map(opponent => opponent.email) };
    const user = {
        email: NON_EXISTING_USER.email,
        password: NON_EXISTING_USER.password,
        staySignedIn: false,
    };
    
    await expectActionToFailWithError(() => signInAndCreateGameAction(game, user), {
        status: HttpStatusCode.UNAUTHORIZED,
        data: errorResponse(ClientError.InvalidCredentials),
    });
});



test(`Creating game with non-existing opponent should not work`, async () => {
    const game = { name: 'Game', opponents: [NON_EXISTING_USER.email] };
    const user = {
        email: CREATOR.email,
        password: CREATOR.password,
        staySignedIn: false,
    };
    
    await expectActionToFailWithError(() => signInAndCreateGameAction(game, user), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST),
    });
});



test(`Creating game with duplicate opponents should not work`, async () => {
    const game = { name: 'Game', opponents: [OPPONENTS[0], OPPONENTS[0]].map(opponent => opponent.email) };
    const user = {
        email: CREATOR.email,
        password: CREATOR.password,
        staySignedIn: false,
    };
    
    await expectActionToFailWithError(() => signInAndCreateGameAction(game, user), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST),
    });
});



test(`Creating game with too many opponents should not work`, async () => {
    const game = { name: 'Game', opponents: [...OPPONENTS, EXTRA_USER].map(opponent => opponent.email) };
    const user = {
        email: CREATOR.email,
        password: CREATOR.password,
        staySignedIn: false,
    };
    
    await expectActionToFailWithError(() => signInAndCreateGameAction(game, user), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST),
    });
});



test(`Creating game without opponents should not work`, async () => {
    const game = { name: 'Game', opponents: [] };
    const user = {
        email: CREATOR.email,
        password: CREATOR.password,
        staySignedIn: false,
    };
    
    await expectActionToFailWithError(() => signInAndCreateGameAction(game, user), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST),
    });
});



test(`Creating game without name parameter should not work`, async () => {
    const game = { opponents: OPPONENTS };
    const user = {
        email: CREATOR.email,
        password: CREATOR.password,
        staySignedIn: false,
    };
    
    await expectActionToFailWithError(() => signInAndCreateGameAction(game, user), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST, ['name']),
    });
});



test(`Creating game without opponents parameter should not work`, async () => {
    const game = { name: 'Game' };
    const user = {
        email: CREATOR.email,
        password: CREATOR.password,
        staySignedIn: false,
    };
    
    await expectActionToFailWithError(() => signInAndCreateGameAction(game, user), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST, ['opponents']),
    });
});