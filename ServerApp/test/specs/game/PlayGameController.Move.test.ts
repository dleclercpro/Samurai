import { PLAYERS, USER_WITH_MOVE, afterAllPlay, afterEachPlay, beforeAllPlay, beforeEachPlay, createGame } from '.';
import assert from 'assert';



beforeAll(beforeAllPlay);
beforeEach(beforeEachPlay);
afterAll(afterAllPlay);
afterEach(afterEachPlay);



test(`Placing move order with valid parameters should work`, async () => {
    const user = { email: USER_WITH_MOVE.email, password: USER_WITH_MOVE.password, staySignedIn: false };

    // Create test game in database
    const game = await createGame(Object.keys(PLAYERS), 'PLAYER_WITH_MOVE');

    // TODO
    assert.equal(0, 0);
});