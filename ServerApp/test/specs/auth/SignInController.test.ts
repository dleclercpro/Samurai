import { errorResponse, successResponse } from '../../../src/libs/calls';
import { ClientError } from '../../../src/errors/ClientErrors';
import { HttpStatusCode, HttpStatusMessage } from '../../../src/types/HTTPTypes';
import { defaultAfterAll, defaultAfterEach, defaultBeforeAll, defaultBeforeEach, expectActionToFailWithError } from '../..';
import { signUpAction, signInAction, signOutAction } from '../../actions/AuthActions';



const USER = { email: 'user1@test.com', password: 'q12345678!', username: 'User' };
const NON_EXISTING_USER = { email: 'user2@test.com', password: 'q87654321!', username: 'NonExistingUser' };



beforeAll(defaultBeforeAll);
beforeEach(defaultBeforeEach);
afterAll(defaultAfterAll);
afterEach(defaultAfterEach);



test(`Signing in with valid credentials should work`, async () => {
    await signUpAction(USER);

    const action = () => signInAction({
        email: USER.email,
        password: USER.password,
        staySignedIn: false,
    });

    await expect(action()).resolves.toEqual(successResponse({
        username: USER.username,
        email: USER.email,
    }));

    await signOutAction();
});



test(`Signing in with wrong password should NOT work`, async () => {
    const user = {
        email: USER.email,
        password: USER.password + 'X',
        staySignedIn: false,
    };

    await expectActionToFailWithError(() => signInAction(user), {
        status: HttpStatusCode.UNAUTHORIZED,
        data: errorResponse(ClientError.InvalidCredentials),
    });
});



test(`Signing in with non-existing user should NOT work`, async () => {
    const user = {
        email: NON_EXISTING_USER.email,
        password: NON_EXISTING_USER.password,
        staySignedIn: false,
    };

    await expectActionToFailWithError(() => signInAction(user), {
        status: HttpStatusCode.UNAUTHORIZED,
        data: errorResponse(ClientError.InvalidCredentials),
    });
});



test(`Signing in with missing parameters should NOT work`, async () => {
    await expectActionToFailWithError(() => signInAction({ password: USER.password, staySignedIn: false }), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST, ['email']),
    });

    await expectActionToFailWithError(() => signInAction({ email: USER.email, staySignedIn: false }), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST, ['password']),
    });

    await expectActionToFailWithError(() => signInAction({ email: USER.email, password: USER.password }), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST, ['staySignedIn']),
    });

    await expectActionToFailWithError(() => signInAction({ email: USER.email }), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST, ['password', 'staySignedIn']),
    });

    await expectActionToFailWithError(() => signInAction({ password: USER.password }), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST, ['email', 'staySignedIn']),
    });

    await expectActionToFailWithError(() => signInAction({ staySignedIn: false }), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST, ['email', 'password']),
    });

    await expectActionToFailWithError(() => signInAction({}), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST, ['email', 'password', 'staySignedIn']),
    });
});