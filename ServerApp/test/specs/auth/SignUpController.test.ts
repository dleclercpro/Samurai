import { errorResponse } from '../../../src/libs/calls';
import { ClientError } from '../../../src/errors/ClientErrors';
import { HttpStatusCode, HttpStatusMessage } from '../../../src/types/HTTPTypes';
import { defaultAfterAll, defaultAfterEach, defaultBeforeAll, defaultBeforeEach, expectActionToFailWithError } from '../..';
import { signUpAction } from '../../actions/AuthActions';



const VALID_EMAIL = 'user@test.com';
const VALID_PASSWORD = 'q12345678!';
const VALID_USERNAME = 'User';
const INVALID_EMAIL = 'test';
const INVALID_PASSWORD = '123';



beforeAll(defaultBeforeAll);
beforeEach(defaultBeforeEach);
afterAll(defaultAfterAll);
afterEach(defaultAfterEach);



test(`Signing up with valid credentials should work`, async () => {
    const user = { email: VALID_EMAIL, password: VALID_PASSWORD, username: VALID_USERNAME };

    const { code, data } = await signUpAction(user);

    expect(code).toEqual(0);
    expect(data.id).toBeDefined();
});



test(`Signing up with existing user's e-mail should NOT work`, async () => {
    const user = { email: VALID_EMAIL, password: VALID_PASSWORD, username: VALID_USERNAME };

    // Sign up once
    await signUpAction(user);

    // Signing up with same credentials should fail
    await expectActionToFailWithError(() => signUpAction(user), {
        status: HttpStatusCode.FORBIDDEN,
        data: errorResponse(ClientError.UserAlreadyExists),
    });
});



test(`Signing up with invalid e-mail should NOT work`, async () => {
    const user = { email: INVALID_EMAIL, password: VALID_PASSWORD, username: VALID_USERNAME };

    await expectActionToFailWithError(() => signUpAction(user), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(ClientError.InvalidEmail),
    });
});



test(`Signing up with invalid password should NOT work`, async () => {
    const user = { email: VALID_EMAIL, password: INVALID_PASSWORD, username: VALID_USERNAME };

    await expectActionToFailWithError(() => signUpAction(user), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(ClientError.InvalidPassword),
    });
});



test(`Signing up with missing parameters should NOT work`, async () => {
    await expectActionToFailWithError(() => signUpAction({ email: VALID_EMAIL, username: VALID_USERNAME }), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST, ['password']),
    });

    await expectActionToFailWithError(() => signUpAction({ password: VALID_PASSWORD, username: VALID_USERNAME }), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST, ['email']),
    });

    await expectActionToFailWithError(() => signUpAction({ email: VALID_EMAIL, password: VALID_PASSWORD }), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST, ['username']),
    });

    await expectActionToFailWithError(() => signUpAction({}), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST, ['email', 'password', 'username']),
    });
});