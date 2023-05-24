import { HAND_TILE_ID_MILITARY, USER, USER_WITH_MOVE, afterAllPlay, afterEachPlay, beforeAllPlay, beforeEachPlay, createGame } from '.';
import { errorResponse, successResponse } from '../../../src/libs/calls';
import { playGameAction } from '../../actions/GameActions';
import { signInAction, signOutAction } from '../../actions/AuthActions';
import { expectActionToFailWithError } from '../..';
import { ClientError } from '../../../src/errors/ClientErrors';
import { HttpStatusCode, HttpStatusMessage } from '../../../src/types/HTTPTypes';
import { HAND_TILE_ID_MOVE } from '../../../src/constants';



beforeAll(beforeAllPlay);
beforeEach(beforeEachPlay);
afterAll(afterAllPlay);
afterEach(afterEachPlay);



test(`Trying to move hand tile that does not belong to player should NOT work`, async () => {
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
});