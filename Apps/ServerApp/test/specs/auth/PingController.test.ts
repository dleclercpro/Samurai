import { errorResponse, successResponse } from '../../../src/utils/calls';
import { ClientError } from '../../../src/errors/ClientErrors';
import { HttpStatusCode } from '../../../src/types/HTTPTypes';
import { defaultAfterAll, defaultAfterEach, defaultBeforeAll, defaultBeforeEach, expectActionToFailWithError } from '../..';
import { signUpAction, pingAction, signInAction, signOutAction } from '../../actions/AuthActions';



const USER = { email: 'user1@test.com', password: 'q12345678!', username: 'User' };



beforeAll(defaultBeforeAll);
beforeEach(defaultBeforeEach);
afterAll(defaultAfterAll);
afterEach(defaultAfterEach);



test(`Pinging with logged in user should work`, async () => {
    await signUpAction(USER);

    await signInAction({
        email: USER.email,
        password: USER.password,
        staySignedIn: false,
    });
    
    await expect(pingAction()).resolves.toEqual(successResponse({
        username: USER.username,
        email: USER.email,
        isAdmin: false,
    }));

    await signOutAction();
});



test(`Pinging with logged out user should NOT work`, async () => {
    await expectActionToFailWithError(() => pingAction(), {
        status: HttpStatusCode.UNAUTHORIZED,
        data: errorResponse(ClientError.InvalidCredentials),
    });
});