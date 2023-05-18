import { USER_WITH_MOVE, afterAllPlay, afterEachPlay, beforeAllPlay, beforeEachPlay, createGame } from '.';
import assert from 'assert';



beforeAll(beforeAllPlay);
beforeEach(beforeEachPlay);
afterAll(afterAllPlay);
afterEach(afterEachPlay);



test(`Placing move order with valid parameters should work`, async () => {
    const user = { ...USER_WITH_MOVE, staySignedIn: false };

    // Create test game in database
    const game = await createGame();

    // TODO
    assert.equal(0, 0);
});