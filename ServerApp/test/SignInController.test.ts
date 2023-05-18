import { start, stop } from '../src/app';
import { errorResponse, successResponse } from '../src/libs/calls';
import TestDatabase from '../src/databases/TestDatabase';
import { ClientError } from '../src/errors/ClientErrors';
import { HttpStatusCode, HttpStatusMessage } from '../src/types/HTTPTypes';
import { expectActionToFailWithError } from '.';
import { signUpAction, signInAction } from './actions';

const USER = { email: 'user1@test.com', password: 'q12345678!', username: 'User' };
const NON_EXISTING_USER = { email: 'user2@test.com', password: 'q87654321!', username: 'NonExistingUser' };

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



test(`Signing in with valid credentials should work`, async () => {
    const user = { ...USER, staySignedIn: false };
    
    const response = signInAction(user);

    await expect(response).resolves.toEqual(successResponse({
        username: USER.username,
    }));
});



test(`Signing in with wrong password should not work`, async () => {
    const user = { ...USER, password: 'XXX', staySignedIn: false };

    await expectActionToFailWithError(() => signInAction(user), {
        status: HttpStatusCode.UNAUTHORIZED,
        data: errorResponse(ClientError.InvalidCredentials),
    });
});



test(`Signing in with missing parameters should not work`, async () => {
    await expectActionToFailWithError(() => signInAction({ password: USER.password, staySignedIn: false }), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST, ['email']),
    });

    await expectActionToFailWithError(() => signInAction({ email: USER.email, staySignedIn: false }), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST, ['password']),
    });

    await expectActionToFailWithError(() => signInAction(USER), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST, ['staySignedIn']),
    });
});



test(`Signing in with non-existing user should not work`, async () => {
    const user = { ...NON_EXISTING_USER, staySignedIn: false };

    await expectActionToFailWithError(() => signInAction(user), {
        status: HttpStatusCode.UNAUTHORIZED,
        data: errorResponse(ClientError.InvalidCredentials),
    });
});