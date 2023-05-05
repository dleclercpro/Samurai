import { USER_WITHOUT_SPECIAL_TILES, afterAllPlay, afterEachPlay, beforeAllPlay, beforeEachPlay, createGame } from '.';
import { playGameAction } from '../actions';
import { successResponse } from '../../src/libs/calls';



beforeAll(beforeAllPlay);
beforeEach(beforeEachPlay);
afterAll(afterAllPlay);
afterEach(afterEachPlay);



test(`Placing regular ground hand tile on free ground board tile should work`, async () => {
    const user = { ...USER_WITHOUT_SPECIAL_TILES, staySignedIn: false };

    // Create test game in database
    const game = await createGame();

    // Build game order
    const order = {
        handTileId: 0,
        boardTileIds: { from: null, to: 30 }, // Free ground board tile
        castes: { from: null, to: null },
    };

    const action = playGameAction(game.getId(), order, user);

    await expect(action).resolves.toEqual(successResponse());
});



test(`Placing samurai hand tile on free ground board tile should work`, async () => {
    const user = { ...USER_WITHOUT_SPECIAL_TILES, staySignedIn: false };

    // Create test game in database
    const game = await createGame();

    // Build game order
    const order = {
        handTileId: 10,
        boardTileIds: { from: null, to: 30 }, // Free ground board tile
        castes: { from: null, to: null },
    };

    const action = playGameAction(game.getId(), order, user);

    await expect(action).resolves.toEqual(successResponse());
});



test(`Placing ship hand tile on free water board tile should work`, async () => {
    const user = { ...USER_WITHOUT_SPECIAL_TILES, staySignedIn: false };

    // Create test game in database
    const game = await createGame();

    // Build game order
    const order = {
        handTileId: 15,
        boardTileIds: { from: null, to: 0 }, // Free water board tile
        castes: { from: null, to: null },
    };

    const action = playGameAction(game.getId(), order, user);

    await expect(action).resolves.toEqual(successResponse());
});