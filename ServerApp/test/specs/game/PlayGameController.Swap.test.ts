import { HAND_TILE_ID_SWAP } from '../../../src/constants';
import { Caste } from '../../../src/types/GameTypes';
import { expectActionToFailWithError } from '../..';
import { HttpStatusCode } from '../../../src/types/HTTPTypes';
import { ClientError } from '../../../src/errors/ClientErrors';
import { errorResponse, successResponse } from '../../../src/libs/calls';
import { playGameAction } from '../../actions/GameActions';
import { PLAYERS, USER_WITH_SWAP, afterAllPlay, afterEachPlay, beforeAllPlay, beforeEachPlay, createGame } from '.';



beforeAll(beforeAllPlay);
beforeEach(beforeEachPlay);
afterAll(afterAllPlay);
afterEach(afterEachPlay);



test(`Placing swap order with valid parameters should work`, async () => {
    const user = {
        email: USER_WITH_SWAP.email,
        password: USER_WITH_SWAP.password,
        staySignedIn: false,
    };

    // Create test game in database
    const game = await createGame(Object.keys(PLAYERS), 'PLAYER_WITH_SWAP');

    // Build game order
    const order = {
        handTileId: HAND_TILE_ID_SWAP,
        boardTileIds: { from: 36, to: 38 },
        castes: { from: Caste.Military, to: Caste.Religion },
    };

    const action = () => playGameAction(game.getId(), order, user);

    await expect(action()).resolves.toEqual(successResponse());
});



test(`Placing swap order with missing caste should not work`, async () => {
    const user = {
        email: USER_WITH_SWAP.email,
        password: USER_WITH_SWAP.password,
        staySignedIn: false,
    };

    // Create test game in database
    const game = await createGame(Object.keys(PLAYERS), 'PLAYER_WITH_SWAP');

    // Build game order
    const missingFromCasteOrder = {
        handTileId: HAND_TILE_ID_SWAP,
        boardTileIds: { from: 36, to: 38 },
        castes: { from: Caste.Commerce, to: Caste.Religion },
    };
    const missingToCasteOrder = {
        handTileId: HAND_TILE_ID_SWAP,
        boardTileIds: { from: 36, to: 38 },
        castes: { from: Caste.Military, to: Caste.Commerce },
    };
    const missingBothCastesOrder = {
        handTileId: HAND_TILE_ID_SWAP,
        boardTileIds: { from: 36, to: 38 },
        castes: { from: Caste.Commerce, to: Caste.Commerce },
    };

    await expectActionToFailWithError(() => playGameAction(game.getId(), missingFromCasteOrder, user), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(ClientError.InvalidGameOrder),
    });
    await expectActionToFailWithError(() => playGameAction(game.getId(), missingToCasteOrder, user), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(ClientError.InvalidGameOrder),
    });
    await expectActionToFailWithError(() => playGameAction(game.getId(), missingBothCastesOrder, user), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(ClientError.InvalidGameOrder),
    });
});