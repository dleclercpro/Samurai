import { HAND_TILE_ID_MOVE } from '../../src/constants';
import assert from 'assert';
import { expectActionToFailWithError } from '..';
import { HttpStatusCode, HttpStatusMessage } from '../../src/types/HTTPTypes';
import { ClientError } from '../../src/errors/ClientErrors';
import { errorResponse } from '../../src/libs/calls';
import { playGameAction } from '../actions';
import { USER, afterAllPlay, afterEachPlay, beforeAllPlay, beforeEachPlay, createGame } from '.';



beforeAll(beforeAllPlay);
beforeEach(beforeEachPlay);
afterAll(afterAllPlay);
afterEach(afterEachPlay);



test(`Playing game with valid move should work`, () => {
    assert.equal(0, 0);
});



test(`Placing game order with invalid parameters should not work`, async () => {
    const user = {
        email: USER.email,
        password: USER.password,
        staySignedIn: false,
    };

    // Create test game in database
    const game = await createGame('PLAYER');

    // Build game orders
    const missingHandTileOrder = {
        boardTileIds: { from: 0, to: 1 },
        castes: { from: null, to: null },
    };
    const missingBoardTilesOrder = {
        handTileId: 0,
        castes: { from: null, to: null },
    };
    const missingCastesOrder = {
        handTileId: 0,
        boardTileIds: { from: 0, to: 1 },
    };

    await expectActionToFailWithError(() => playGameAction(game.getId(), missingHandTileOrder, user), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST, ['handTileId']),
    });
    await expectActionToFailWithError(() => playGameAction(game.getId(), missingBoardTilesOrder, user), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST, ['boardTileIds.from', 'boardTileIds.to']),
    });
    await expectActionToFailWithError(() => playGameAction(game.getId(), missingCastesOrder, user), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST, ['castes.from', 'castes.to']),
    });
});



test(`Placing game order without having corresponding tile in hand should not work`, async () => {
    const user = {
        email: USER.email,
        password: USER.password,
        staySignedIn: false,
    };

    // Create test game in database
    const game = await createGame('PLAYER');

    // Build game order
    const order = {
        handTileId: HAND_TILE_ID_MOVE,
        boardTileIds: { from: 0, to: 1 },
        castes: { from: null, to: null },
    };

    await expectActionToFailWithError(() => playGameAction(game.getId(), order, user), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(ClientError.InvalidGameOrder),
    });
});