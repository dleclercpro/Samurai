import { start, stop } from '../../src/app';
import { errorResponse, successResponse } from '../../src/libs/calls';
import TestDatabase from '../../src/databases/TestDatabase';
import { ClientError } from '../../src/errors/ClientErrors';
import { HttpStatusCode } from '../../src/types/HTTPTypes';
import { expectActionToFailWithError } from '..';
import { signUpAction, pingAction, signInAndGetCookieAction } from '../actions';

const USER = { email: 'user1@test.com', password: 'q12345678!', username: 'User' };

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



test(`Pinging with logged in user should work`, async () => {
    const user = {
        email: USER.email,
        password: USER.password,
        staySignedIn: false,
    };
    
    const cookie = await signInAndGetCookieAction(user);

    await expect(pingAction(cookie)).resolves.toEqual(successResponse({
        username: USER.username,
        email: USER.email,
    }));
});



test(`Pinging with logged out user should not work`, async () => {
    await expectActionToFailWithError(() => pingAction(), {
        status: HttpStatusCode.UNAUTHORIZED,
        data: errorResponse(ClientError.InvalidCredentials),
    });
});