import { HAND_TILE_ID_MOVE } from '../../../src/constants';
import { expectActionToFailWithError } from '../..';
import { HttpStatusCode, HttpStatusMessage } from '../../../src/types/HTTPTypes';
import { ClientError } from '../../../src/errors/ClientErrors';
import { errorResponse, successResponse } from '../../../src/libs/calls';
import { playGameAction } from '../../actions/GameActions';
import { HAND_TILE_ID_MILITARY, HAND_TILE_ID_RELIGION, HAND_TILE_ID_SAMURAI, PLAYERS, USER, afterAllPlay, afterEachPlay, beforeAllPlay, beforeEachPlay, createGame } from '.';
import { signInAction, signOutAction } from '../../actions/AuthActions';



const customBeforeEachPlay = async () => {
    await beforeEachPlay();

    // Sign in default player
    await signInAction({
        email: USER.email,
        password: USER.password,
        staySignedIn: false,
    });
};



const customAfterEachPlay = async () => {
    await signOutAction();

    await afterEachPlay();
};



beforeAll(beforeAllPlay);
beforeEach(customBeforeEachPlay);
afterAll(afterAllPlay);
afterEach(customAfterEachPlay);



test(`Placing game order with invalid parameters should NOT work`, async () => {
    const game = await createGame(Object.keys(PLAYERS), 'PLAYER');

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

    await expectActionToFailWithError(() => playGameAction(game.getId(), missingHandTileOrder), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST, ['handTileId']),
    });
    await expectActionToFailWithError(() => playGameAction(game.getId(), missingBoardTilesOrder), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST, ['boardTileIds.from', 'boardTileIds.to']),
    });
    await expectActionToFailWithError(() => playGameAction(game.getId(), missingCastesOrder), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST, ['castes.from', 'castes.to']),
    });
});



test(`Placing game order without having corresponding tile in hand should NOT work`, async () => {
    const game = await createGame(Object.keys(PLAYERS), 'PLAYER');

    // Build game order
    const order = {
        handTileId: HAND_TILE_ID_MOVE,
        boardTileIds: { from: 0, to: 1 },
        castes: { from: null, to: null },
    };

    await expectActionToFailWithError(() => playGameAction(game.getId(), order), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(ClientError.InvalidGameOrder),
    });
});



test(`Placing tile with 'replay' feature should allow same player to play again`, async () => {
    const game = await createGame(Object.keys(PLAYERS), 'PLAYER');

    // Build game orders
    const order1 = {
        handTileId: HAND_TILE_ID_SAMURAI, // Tile with 'replay' feature
        boardTileIds: { from: null, to: 30 }, // Free ground board tile
        castes: { from: null, to: null },
    };
    const order2 = {
        handTileId: HAND_TILE_ID_MILITARY,
        boardTileIds: { from: null, to: 25 }, // Free ground board tile
        castes: { from: null, to: null },
    };

    const action1 = () => playGameAction(game.getId(), order1);
    const action2 = () => playGameAction(game.getId(), order2);

    await expect(action1()).resolves.toEqual(successResponse());
    await expect(action2()).resolves.toEqual(successResponse());
});



test(`Placing tile without 'replay' feature should not allow same player to play again`, async () => {
    const game = await createGame(Object.keys(PLAYERS), 'PLAYER');

    // Build game orders
    const order1 = {
        handTileId: HAND_TILE_ID_MILITARY,
        boardTileIds: { from: null, to: 30 }, // Free ground board tile
        castes: { from: null, to: null },
    };
    const order2 = {
        handTileId: HAND_TILE_ID_RELIGION,
        boardTileIds: { from: null, to: 25 }, // Free ground board tile
        castes: { from: null, to: null },
    };

    const action1 = () => playGameAction(game.getId(), order1);
    const action2 = () => playGameAction(game.getId(), order2);

    // First order should work
    await expect(action1()).resolves.toEqual(successResponse());
    
    // Second order should NOT work, since the last played tile didn't have
    // the 'replay' feature
    await expectActionToFailWithError(action2, {
        status: HttpStatusCode.FORBIDDEN,
        data: errorResponse(HttpStatusMessage.FORBIDDEN),
    });
});