import { expectActionToFailWithError } from '../../..';
import { HttpStatusCode, HttpStatusMessage } from '../../../../src/types/HTTPTypes';
import { errorResponse } from '../../../../src/libs/calls';
import { ClientError } from '../../../../src/errors/ClientErrors';
import { signInAction, signOutAction } from '../../../actions/AuthActions';
import { createGameAction } from '../../../actions/GameActions';
import { afterAllPlay, afterEachPlay, beforeAllPlay, beforeEachPlay } from '..';



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



beforeAll(beforeAllPlay);
beforeEach(beforeEachPlay);
afterAll(afterAllPlay);
afterEach(afterEachPlay);



test(`Creating game with existing user should work`, async () => {
    const game = { name: 'Game', opponents: OPPONENTS.map(opponent => opponent.email) };
    
    await signInAction({
        email: CREATOR.email,
        password: CREATOR.password,
        staySignedIn: false,
    });
    
    const { code, data } = await createGameAction(game);

    expect(code).toEqual(0);
    expect(data.id).toBeDefined();

    await signOutAction();
});



test(`Creating game without session cookie should NOT work`, async () => {
    const game = { name: 'Game', opponents: OPPONENTS.map(opponent => opponent.email) };
    
    await expectActionToFailWithError(() => createGameAction(game), {
        status: HttpStatusCode.UNAUTHORIZED,
        data: errorResponse(ClientError.InvalidCredentials),
    });
});



test(`Creating game with non-existing opponent should NOT work`, async () => {
    const game = { name: 'Game', opponents: [NON_EXISTING_USER.email] };

    await signInAction({
        email: CREATOR.email,
        password: CREATOR.password,
        staySignedIn: false,
    });
    
    await expectActionToFailWithError(() => createGameAction(game), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST),
    });

    await signOutAction();
});



test(`Creating game with duplicate opponents should NOT work`, async () => {
    const game = { name: 'Game', opponents: [OPPONENTS[0], OPPONENTS[0]].map(opponent => opponent.email) };

    await signInAction({
        email: CREATOR.email,
        password: CREATOR.password,
        staySignedIn: false,
    });
    
    await expectActionToFailWithError(() => createGameAction(game), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST),
    });

    await signOutAction();
});



test(`Creating game with too many opponents should NOT work`, async () => {
    const game = { name: 'Game', opponents: [...OPPONENTS, EXTRA_USER].map(opponent => opponent.email) };

    await signInAction({
        email: CREATOR.email,
        password: CREATOR.password,
        staySignedIn: false,
    });
    
    await expectActionToFailWithError(() => createGameAction(game), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST),
    });

    await signOutAction();
});



test(`Creating game without opponents should NOT work`, async () => {
    const game = { name: 'Game', opponents: [] };

    await signInAction({
        email: CREATOR.email,
        password: CREATOR.password,
        staySignedIn: false,
    });
    
    await expectActionToFailWithError(() => createGameAction(game), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST),
    });

    await signOutAction();
});



test(`Creating game without name parameter should NOT work`, async () => {
    const game = { opponents: OPPONENTS };

    await signInAction({
        email: CREATOR.email,
        password: CREATOR.password,
        staySignedIn: false,
    });
    
    await expectActionToFailWithError(() => createGameAction(game), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST, ['name']),
    });

    await signOutAction();
});



test(`Creating game without opponents parameter should NOT work`, async () => {
    const game = { name: 'Game' };

    await signInAction({
        email: CREATOR.email,
        password: CREATOR.password,
        staySignedIn: false,
    });
    
    await expectActionToFailWithError(() => createGameAction(game), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST, ['opponents']),
    });

    await signOutAction();
});