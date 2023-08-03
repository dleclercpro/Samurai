import { signInAction, signOutAction } from '../../actions/AuthActions';
import { createGameAction, getGameDataAction } from '../../actions/GameActions';
import { afterAllPlay, afterEachPlay, beforeAllPlay, beforeEachPlay } from '.';
import { expectActionToFailWithError } from '../..';
import { HttpStatusCode } from '../../../src/types/HTTPTypes';
import { errorResponse } from '../../../src/utils/calls';
import { ClientError } from '../../../src/errors/ClientErrors';



const USER_1 = { email: 'user1@test.com', password: 'q12345678!', username: 'User1' };
const USER_2 = { email: 'user2@test.com', password: 'q12345678!', username: 'User2' };
const USER_3 = { email: 'user3@test.com', password: 'q12345678!', username: 'User3' };
const USER_4 = { email: 'user4@test.com', password: 'q12345678!', username: 'User4' };
const USER_5 = { email: 'user5@test.com', password: 'q12345678!', username: 'User5' };

const CREATOR = USER_1;
const OPPONENTS = [USER_2, USER_3, USER_4];
const EXTRA_USER = USER_5;



beforeAll(beforeAllPlay);
beforeEach(beforeEachPlay);
afterAll(afterAllPlay);
afterEach(afterEachPlay);



test(`User who is part of a game should be able to fetch its data`, async () => {
    const game = { name: 'Game', opponents: OPPONENTS.map(opponent => opponent.email) };
    
    await signInAction({
        email: CREATOR.email,
        password: CREATOR.password,
        staySignedIn: false,
    });
    
    const { data: { id } } = await createGameAction(game);

    const { code, data } = await getGameDataAction(id);

    expect(code).toEqual(0);
    expect(data.name).toEqual(game.name);
    expect(data.version).toEqual(0);
});



test(`User who is NOT part of a game should NOT be able to fetch its data`, async () => {
    const game = { name: 'Game', opponents: OPPONENTS.map(opponent => opponent.email) };
    
    await signInAction({
        email: CREATOR.email,
        password: CREATOR.password,
        staySignedIn: false,
    });
    
    const { data: { id } } = await createGameAction(game);

    await signOutAction();

    // Logging in with user that is not part of the previously
    // created game
    await signInAction({
        email: EXTRA_USER.email,
        password: EXTRA_USER.password,
        staySignedIn: false,
    });

    await expectActionToFailWithError(() => getGameDataAction(id), {
        status: HttpStatusCode.NOT_FOUND,
        data: errorResponse(ClientError.GameDoesNotExist),
    });
});