import { BOARD_TILE_ID_CITY, HAND_TILE_ID_MILITARY, HAND_TILE_ID_SAMURAI, HAND_TILE_ID_SHIP, USER, afterAllPlay, afterEachPlay, beforeAllPlay, beforeEachPlay, createGame } from '.';
import { playGameAction } from '../../actions/GameActions';
import { errorResponse, successResponse } from '../../../src/utils/calls';
import { HttpStatusCode, HttpStatusMessage } from '../../../src/types/HTTPTypes';
import { ClientError } from '../../../src/errors/ClientErrors';
import { signInAction, signOutAction } from '../../actions/AuthActions';
import { expectActionToFailWithError } from '../..';



const customBeforeEachPlay = async () => {
    await beforeEachPlay();

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



test(`Placing hand tile onto free ground board tile in a 2-player game configuration should work`, async () => {
    const game = await createGame(['PLAYER', 'PLAYER_WITH_MOVE_AND_SWAP'], 'PLAYER');

    // Build game order
    const order = {
        handTileId: HAND_TILE_ID_MILITARY,
        boardTileIds: { from: null, to: 94 }, // Free ground board tile
        castes: { from: null, to: null },
    };

    const action = () => playGameAction(game.getId(), order);

    await expect(action()).resolves.toEqual(successResponse());
});



test(`Placing hand tile onto board tile that does not exist in a 2-player game configuration should NOT work`, async () => {
    const game = await createGame(['PLAYER', 'PLAYER_WITH_MOVE_AND_SWAP'], 'PLAYER');

    // Build game order
    const order = {
        handTileId: HAND_TILE_ID_MILITARY,
        boardTileIds: { from: null, to: 30 }, // Non-existent tile in current board configuration
        castes: { from: null, to: null },
    };

    await expectActionToFailWithError(() => playGameAction(game.getId(), order), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(ClientError.InvalidGameOrder),
    });
});



test(`Placing regular ground hand tile onto free ground board tile should work`, async () => {
    const game = await createGame(['PLAYER', 'PLAYER_WITH_MOVE', 'PLAYER_WITH_SWAP', 'PLAYER_WITH_MOVE_AND_SWAP'], 'PLAYER');

    // Build game order
    const order = {
        handTileId: HAND_TILE_ID_MILITARY,
        boardTileIds: { from: null, to: 30 }, // Free ground board tile
        castes: { from: null, to: null },
    };

    const action = () => playGameAction(game.getId(), order);

    await expect(action()).resolves.toEqual(successResponse());
});



test(`Placing samurai hand tile onto free ground board tile should work`, async () => {
    const game = await createGame(['PLAYER', 'PLAYER_WITH_MOVE', 'PLAYER_WITH_SWAP', 'PLAYER_WITH_MOVE_AND_SWAP'], 'PLAYER');

    // Build game order
    const order = {
        handTileId: HAND_TILE_ID_SAMURAI,
        boardTileIds: { from: null, to: 30 }, // Free ground board tile
        castes: { from: null, to: null },
    };

    const action = () => playGameAction(game.getId(), order);

    await expect(action()).resolves.toEqual(successResponse());
});



test(`Placing ship hand tile onto free water board tile should work`, async () => {
    const game = await createGame(['PLAYER', 'PLAYER_WITH_MOVE', 'PLAYER_WITH_SWAP', 'PLAYER_WITH_MOVE_AND_SWAP'], 'PLAYER');

    // Build game order
    const order = {
        handTileId: HAND_TILE_ID_SHIP,
        boardTileIds: { from: null, to: 0 }, // Free water board tile
        castes: { from: null, to: null },
    };

    const action = () => playGameAction(game.getId(), order);

    await expect(action()).resolves.toEqual(successResponse());
});



test(`Placing ship hand tile onto free water board tile shared between different board sections when a section is missing should work`, async () => {
    const game = await createGame(['PLAYER', 'PLAYER_WITH_MOVE'], 'PLAYER');

    // Build game order
    const order = {
        handTileId: HAND_TILE_ID_SHIP,
        boardTileIds: { from: null, to: 47 }, // Free water board tile shared between sections 'North' and 'Center'
        castes: { from: null, to: null },
    };

    const action = () => playGameAction(game.getId(), order);

    await expect(action()).resolves.toEqual(successResponse());
});



test(`Placing regular ground hand tile onto free water board tile should NOT work`, async () => {
    const game = await createGame(['PLAYER', 'PLAYER_WITH_MOVE', 'PLAYER_WITH_SWAP', 'PLAYER_WITH_MOVE_AND_SWAP'], 'PLAYER');

    // Build game order
    const order = {
        handTileId: HAND_TILE_ID_MILITARY,
        boardTileIds: { from: null, to: 0 }, // Free water board tile
        castes: { from: null, to: null },
    };

    await expectActionToFailWithError(() => playGameAction(game.getId(), order), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(ClientError.InvalidGameOrder),
    });
});



test(`Placing samurai hand tile onto free water board tile should NOT work`, async () => {
    const game = await createGame(['PLAYER', 'PLAYER_WITH_MOVE', 'PLAYER_WITH_SWAP', 'PLAYER_WITH_MOVE_AND_SWAP'], 'PLAYER');

    // Build game order
    const order = {
        handTileId: HAND_TILE_ID_SAMURAI,
        boardTileIds: { from: null, to: 0 }, // Free water board tile
        castes: { from: null, to: null },
    };

    await expectActionToFailWithError(() => playGameAction(game.getId(), order), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(ClientError.InvalidGameOrder),
    });
});



test(`Placing ship hand tile onto free ground board tile should NOT work`, async () => {
    const game = await createGame(['PLAYER', 'PLAYER_WITH_MOVE', 'PLAYER_WITH_SWAP', 'PLAYER_WITH_MOVE_AND_SWAP'], 'PLAYER');

    // Build game order
    const order = {
        handTileId: HAND_TILE_ID_SHIP,
        boardTileIds: { from: null, to: 30 }, // Free ground board tile
        castes: { from: null, to: null },
    };

    await expectActionToFailWithError(() => playGameAction(game.getId(), order), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(ClientError.InvalidGameOrder),
    });
});



test(`Placing hand tile onto board tile that's not free should NOT work`, async () => {
    const game = await createGame(['PLAYER', 'PLAYER_WITH_MOVE', 'PLAYER_WITH_SWAP', 'PLAYER_WITH_MOVE_AND_SWAP'], 'PLAYER');

    // Build game order
    const order1 = {
        handTileId: HAND_TILE_ID_SAMURAI, // Trick for test: player can replay after placing this tile
        boardTileIds: { from: null, to: 30 }, // Free ground board tile
        castes: { from: null, to: null },
    };
    const order2 = {
        handTileId: HAND_TILE_ID_MILITARY,
        boardTileIds: { from: null, to: 30 }, // Board tile is not free after first  anymore!
        castes: { from: null, to: null },
    };

    const action1 = () => playGameAction(game.getId(), order1);
    const action2 = () => playGameAction(game.getId(), order2);

    await expect(action1()).resolves.toEqual(successResponse());

    await expectActionToFailWithError(action2, {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(ClientError.InvalidGameOrder),
    });
});



test(`Placing regular ground hand tile onto city board tile should NOT work`, async () => {
    const game = await createGame(['PLAYER', 'PLAYER_WITH_MOVE', 'PLAYER_WITH_SWAP', 'PLAYER_WITH_MOVE_AND_SWAP'], 'PLAYER');

    // Build game order
    const order = {
        handTileId: HAND_TILE_ID_MILITARY,
        boardTileIds: { from: null, to: BOARD_TILE_ID_CITY },
        castes: { from: null, to: null },
    };

    await expectActionToFailWithError(() => playGameAction(game.getId(), order), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(ClientError.InvalidGameOrder),
    });
});



test(`Placing tile when it's not player's turn should NOT work`, async () => {
    const game = await createGame(['PLAYER', 'PLAYER_WITH_MOVE', 'PLAYER_WITH_SWAP', 'PLAYER_WITH_MOVE_AND_SWAP'], 'PLAYER_WITH_MOVE_AND_SWAP');

    // Build game order
    const order = {
        handTileId: HAND_TILE_ID_MILITARY,
        boardTileIds: { from: null, to: 30 }, // Free ground board tile
        castes: { from: null, to: null },
    };

    await expectActionToFailWithError(() => playGameAction(game.getId(), order), {
        status: HttpStatusCode.FORBIDDEN,
        data: errorResponse(HttpStatusMessage.FORBIDDEN),
    });
});