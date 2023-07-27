import { errorResponse, successResponse } from '../../../src/libs/calls';
import { defaultAfterAll, defaultAfterEach, defaultBeforeAll, defaultBeforeEach, expectActionToFailWithError } from '../..';
import { signUpAction, signInAction, signOutAction } from '../../actions/AuthActions';
import { HttpStatusCode } from '../../../src/types/HTTPTypes';
import { ClientError } from '../../../src/errors/ClientErrors';



const USER = { email: 'user1@test.com', password: 'q12345678!', username: 'User' };



export const customBeforeEachPlay = async () => {
    await defaultBeforeEach();
    await signUpAction(USER);
};



beforeAll(defaultBeforeAll);
beforeEach(customBeforeEachPlay);
afterAll(defaultAfterAll);
afterEach(defaultAfterEach);



test(`Signing out when logged in should work`, async () => {
    await signInAction({
        email: USER.email,
        password: USER.password,
        staySignedIn: false,
    });

    const action = () => signOutAction();

    await expect(action()).resolves.toEqual(successResponse());
});



test(`Signing out when logged out should NOT work`, async () => {
    const action = () => signOutAction();

    await expectActionToFailWithError(action, {
        status: HttpStatusCode.UNAUTHORIZED,
        data: errorResponse(ClientError.InvalidCredentials),
    });
});