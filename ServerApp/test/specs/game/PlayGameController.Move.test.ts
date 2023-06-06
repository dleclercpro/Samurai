import { BOARD_TILE_ID_CITY, HAND_TILE_ID_MILITARY, HAND_TILE_ID_SAMURAI, HAND_TILE_ID_SHIP, USER, USER_WITH_MOVE, afterAllPlay, afterEachPlay, beforeAllPlay, beforeEachPlay, createGame } from '.';
import { errorResponse, successResponse } from '../../../src/libs/calls';
import { playGameAction } from '../../actions/GameActions';
import { signInAction, signOutAction } from '../../actions/AuthActions';
import { expectActionToFailWithError } from '../..';
import { HttpStatusCode, HttpStatusMessage } from '../../../src/types/HTTPTypes';
import { HAND_TILE_ID_MOVE } from '../../../src/constants';
import { ClientError } from '../../../src/errors/ClientErrors';



beforeAll(beforeAllPlay);
beforeEach(beforeEachPlay);
afterAll(afterAllPlay);
afterEach(afterEachPlay);



test(`Valid move order should work`, async () => {
    const game = await createGame(['PLAYER', 'PLAYER_WITH_MOVE', 'PLAYER_WITH_SWAP', 'PLAYER_WITH_MOVE_AND_SWAP'], 'PLAYER_WITH_MOVE');

    // Build game orders
    const order1 = {
        handTileId: HAND_TILE_ID_SAMURAI, // Trick to allow player with move to replay
        boardTileIds: { from: null, to: 86 }, // To: free ground board tile
        castes: { from: null, to: null },
    };
    const order2 = {
        handTileId: HAND_TILE_ID_MOVE,
        boardTileIds: { from: 86, to: 88 }, // To: free ground board tile
        castes: { from: null, to: null },
    };

    const action1 = () => playGameAction(game.getId(), order1);
    const action2 = () => playGameAction(game.getId(), order2);

    // Sign in user
    await signInAction({
        email: USER_WITH_MOVE.email,
        password: USER_WITH_MOVE.password,
        staySignedIn: false,
    });

    await expect(action1()).resolves.toEqual(successResponse());
    await expect(action2()).resolves.toEqual(successResponse());

    await signOutAction();
});



test(`Moving hand tile that does not belong to player should NOT work`, async () => {
    const game = await createGame(['PLAYER', 'PLAYER_WITH_MOVE'], 'PLAYER');

    // Build game order
    const firstPlayerOrder = {
        handTileId: HAND_TILE_ID_MILITARY,
        boardTileIds: { from: null, to: 86 }, // Free ground board tile
        castes: { from: null, to: null },
    };
    const secondPlayerOrder = {
        handTileId: HAND_TILE_ID_MOVE,
        boardTileIds: { from: 86, to: 88 },
        castes: { from: null, to: null },
    };

    const firstPlayerAction = () => playGameAction(game.getId(), firstPlayerOrder);
    const secondPlayerAction = () => playGameAction(game.getId(), secondPlayerOrder);

    // Sign in first user
    await signInAction({
        email: USER.email,
        password: USER.password,
        staySignedIn: false,
    });

    // Placing first hand tile should work
    await expect(firstPlayerAction()).resolves.toEqual(successResponse());

    // Sign out first user and sign in second one
    await signOutAction();
    await signInAction({
        email: USER_WITH_MOVE.email,
        password: USER_WITH_MOVE.password,
        staySignedIn: false,
    });

    // Trying to move hand tile that does not belong to player should not work
    await expectActionToFailWithError(secondPlayerAction, {
        status: HttpStatusCode.FORBIDDEN,
        data: errorResponse(HttpStatusMessage.FORBIDDEN),
    });

    await signOutAction();
});



test(`Moving hand tile from a free board tile should NOT work`, async () => {
    const game = await createGame(['PLAYER', 'PLAYER_WITH_MOVE', 'PLAYER_WITH_SWAP', 'PLAYER_WITH_MOVE_AND_SWAP'], 'PLAYER_WITH_MOVE');

    // Build game order
    const order = {
        handTileId: HAND_TILE_ID_MOVE,
        boardTileIds: { from: 86, to: 88 }, // Free ground board tile
        castes: { from: null, to: null },
    };

    const action = () => playGameAction(game.getId(), order);

    await signInAction({
        email: USER_WITH_MOVE.email,
        password: USER_WITH_MOVE.password,
        staySignedIn: false,
    });

    // Trying to move hand tile that does not belong to player should not work
    await expectActionToFailWithError(action, {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(ClientError.InvalidGameOrder),
    });

    await signOutAction();
});



test(`Moving hand tile onto board tile that's not free should NOT work`, async () => {
    const game = await createGame(['PLAYER', 'PLAYER_WITH_MOVE'], 'PLAYER');

    // Build game order
    const firstPlayerOrder = {
        handTileId: HAND_TILE_ID_MILITARY,
        boardTileIds: { from: null, to: 86 }, // Free ground board tile
        castes: { from: null, to: null },
    };
    const secondPlayerOrder1 = {
        handTileId: HAND_TILE_ID_MILITARY,
        boardTileIds: { from: null, to: 88 },
        castes: { from: null, to: null },
    };
    const secondPlayerOrder2 = {
        handTileId: HAND_TILE_ID_MOVE,
        boardTileIds: { from: 88, to: 86 },
        castes: { from: null, to: null },
    };

    const firstPlayerAction = () => playGameAction(game.getId(), firstPlayerOrder);
    const secondPlayerAction1 = () => playGameAction(game.getId(), secondPlayerOrder1);
    const secondPlayerAction2 = () => playGameAction(game.getId(), secondPlayerOrder2);

    // Sign in first user
    await signInAction({
        email: USER.email,
        password: USER.password,
        staySignedIn: false,
    });

    await expect(firstPlayerAction()).resolves.toEqual(successResponse());

    // Sign out first user and sign in second one
    await signOutAction();
    await signInAction({
        email: USER_WITH_MOVE.email,
        password: USER_WITH_MOVE.password,
        staySignedIn: false,
    });

    await expect(secondPlayerAction1()).resolves.toEqual(successResponse());

    await expectActionToFailWithError(secondPlayerAction2, {
        status: HttpStatusCode.FORBIDDEN,
        data: errorResponse(HttpStatusMessage.FORBIDDEN),
    });

    await signOutAction();
});



test(`Moving hand tile onto city board tile should NOT work`, async () => {
    const game = await createGame(['PLAYER', 'PLAYER_WITH_MOVE', 'PLAYER_WITH_SWAP', 'PLAYER_WITH_MOVE_AND_SWAP'], 'PLAYER_WITH_MOVE');

    // Build game order
    const order1 = {
        handTileId: HAND_TILE_ID_SAMURAI, // Trick for user to be able to replay
        boardTileIds: { from: null, to: 30 }, // Free board tile
        castes: { from: null, to: null },
    };
    const order2 = {
        handTileId: HAND_TILE_ID_MOVE,
        boardTileIds: { from: 30, to: BOARD_TILE_ID_CITY },
        castes: { from: null, to: null },
    };

    const action1 = () => playGameAction(game.getId(), order1);
    const action2 = () => playGameAction(game.getId(), order2);

    // Sign in user
    await signInAction({
        email: USER_WITH_MOVE.email,
        password: USER_WITH_MOVE.password,
        staySignedIn: false,
    });

    await expect(action1()).resolves.toEqual(successResponse());

    await expectActionToFailWithError(action2, {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(ClientError.InvalidGameOrder),
    });

    await signOutAction();
});



test(`Moving hand tile from ground board tile onto water board tile should NOT work`, async () => {
    const game = await createGame(['PLAYER', 'PLAYER_WITH_MOVE', 'PLAYER_WITH_SWAP', 'PLAYER_WITH_MOVE_AND_SWAP'], 'PLAYER_WITH_MOVE');

    // Build game order
    const order1 = {
        handTileId: HAND_TILE_ID_SAMURAI, // Trick for user to be able to replay
        boardTileIds: { from: null, to: 30 }, // Free board tile
        castes: { from: null, to: null },
    };
    const order2 = {
        handTileId: HAND_TILE_ID_MOVE,
        boardTileIds: { from: 30, to: 97 }, // Free water board tile
        castes: { from: null, to: null },
    };

    const action1 = () => playGameAction(game.getId(), order1);
    const action2 = () => playGameAction(game.getId(), order2);

    // Sign in user
    await signInAction({
        email: USER_WITH_MOVE.email,
        password: USER_WITH_MOVE.password,
        staySignedIn: false,
    });

    await expect(action1()).resolves.toEqual(successResponse());

    await expectActionToFailWithError(action2, {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(ClientError.InvalidGameOrder),
    });

    await signOutAction();
});



test(`Moving hand tile from water board tile should NOT work`, async () => {
    const game = await createGame(['PLAYER', 'PLAYER_WITH_MOVE', 'PLAYER_WITH_SWAP', 'PLAYER_WITH_MOVE_AND_SWAP'], 'PLAYER_WITH_MOVE');

    // Build game order
    const order1 = {
        handTileId: HAND_TILE_ID_SHIP, // Trick for user to be able to replay
        boardTileIds: { from: null, to: 97 }, // Free water tile
        castes: { from: null, to: null },
    };
    const order2 = {
        handTileId: HAND_TILE_ID_MOVE,
        boardTileIds: { from: 97, to: 98 }, // Free water board tile
        castes: { from: null, to: null },
    };

    const action1 = () => playGameAction(game.getId(), order1);
    const action2 = () => playGameAction(game.getId(), order2);

    // Sign in user
    await signInAction({
        email: USER_WITH_MOVE.email,
        password: USER_WITH_MOVE.password,
        staySignedIn: false,
    });

    await expect(action1()).resolves.toEqual(successResponse());

    await expectActionToFailWithError(action2, {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(ClientError.InvalidGameOrder),
    });

    await signOutAction();
});