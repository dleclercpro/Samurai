import { start, stop } from '../src/app';
import { errorResponse } from '../src/libs/calls';
import TestDatabase from '../src/databases/TestDatabase';
import { ClientError } from '../src/errors/ClientErrors';
import { HttpStatusCode, HttpStatusMessage } from '../src/types/HTTPTypes';
import { expectActionToFailWithError } from '.';
import { signUpAction } from './actions';

const VALID_EMAIL = 'user@test.com';
const VALID_PASSWORD = 'q12345678!';
const INVALID_EMAIL = 'test';
const INVALID_PASSWORD = '123';

beforeAll(async () => {
    await start();
});

beforeEach(async () => {

});

afterAll(async () => {
    await TestDatabase.drop();

    await stop();
});

afterEach(async () => {
    await TestDatabase.dropCollections();
});



test(`Signing up with valid credentials should work`, async () => {
    const user = { email: VALID_EMAIL, password: VALID_PASSWORD };

    const { code, data } = await signUpAction(user);

    expect(code).toEqual(0);
    expect(data.id).toBeDefined();
});



test(`Signing up with existing user's e-mail should not work`, async () => {
    const user = { email: VALID_EMAIL, password: VALID_PASSWORD };

    await signUpAction(user);

    await expectActionToFailWithError(() => signUpAction(user), {
        status: HttpStatusCode.FORBIDDEN,
        data: errorResponse(ClientError.UserAlreadyExists),
    });
});



test(`Signing up with invalid e-mail should not work`, async () => {
    const user = { email: INVALID_EMAIL, password: VALID_PASSWORD };

    await expectActionToFailWithError(() => signUpAction(user), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(ClientError.InvalidEmail),
    });
});



test(`Signing up with invalid password should not work`, async () => {
    const user = { email: VALID_EMAIL, password: INVALID_PASSWORD };

    await expectActionToFailWithError(() => signUpAction(user), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(ClientError.InvalidPassword),
    });
});



test(`Signing up with missing parameters should not work`, async () => {
    await expectActionToFailWithError(() => signUpAction({ email: VALID_EMAIL }), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST),
    });

    await expectActionToFailWithError(() => signUpAction({ password: VALID_PASSWORD }), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST),
    });
});