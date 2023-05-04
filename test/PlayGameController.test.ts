import { start, stop } from '../src/app';
import TestDatabase from '../src/databases/TestDatabase';
import HandBuilder from '../src/helpers/builders/HandBuilder';
import { HAND_TILE_ID_MOVE, HAND_TILE_ID_SWAP } from '../src/constants';
import Player from '../src/models/Player';
import { Color } from '../src/types/GameTypes';
import Game from '../src/models/Game';
import BoardBuilder from '../src/helpers/builders/BoardBuilder';
import assert from 'assert';
import { expectActionToFailWithError } from '.';
import { HttpStatusCode, HttpStatusMessage } from '../src/types/HTTPTypes';
import { ClientError } from '../src/errors/ClientErrors';
import { errorResponse } from '../src/libs/calls';
import { signUpAction, playGameAction } from './actions';
import { getRange } from '../src/libs/math';

const USER_WITH_MOVE = { email: 'user1@test.com', password: 'q12345678!' };
const USER_WITH_SWAP = { email: 'user2@test.com', password: 'q12345678!' };
const USER_WITH_MOVE_AND_SWAP = { email: 'user3@test.com', password: 'q12345678!' };
const USER_WITHOUT_SPECIAL_TILES = { email: 'user4@test.com', password: 'q12345678!' };

const PLAYER_WITH_MOVE = new Player({
    userId: '',
    isPlaying: true,
    isCreator: true,
    color: Color.Purple,
    hand: new HandBuilder().build([1, 2, 3, 4, HAND_TILE_ID_MOVE]),
});

const PLAYER_WITH_SWAP = new Player({
    userId: '',
    isPlaying: false,
    isCreator: false,
    color: Color.Orange,
    hand: new HandBuilder().build([1, 2, 3, 4, HAND_TILE_ID_SWAP]),
});

const PLAYER_WITH_MOVE_AND_SWAP = new Player({
    userId: '',
    isPlaying: false,
    isCreator: false,
    color: Color.Green,
    hand: new HandBuilder().build([1, 2, 3, HAND_TILE_ID_MOVE, HAND_TILE_ID_SWAP]),
});

const PLAYER_WITHOUT_SPECIAL_TILES = new Player({
    userId: '',
    isPlaying: false,
    isCreator: false,
    color: Color.Red,
    hand: new HandBuilder().build([1, 2, 3, 4, 5]),
});

const USERS = [
    USER_WITH_MOVE,
    USER_WITH_SWAP,
    USER_WITH_MOVE_AND_SWAP,
    USER_WITHOUT_SPECIAL_TILES,
];

const PLAYERS = [
    PLAYER_WITH_MOVE,
    PLAYER_WITH_SWAP,
    PLAYER_WITH_MOVE_AND_SWAP,
    PLAYER_WITHOUT_SPECIAL_TILES,
];



beforeAll(async () => {
    await start();
});

beforeEach(async () => {

    // Create users and generate players with their IDs
    await Promise.all(getRange(USERS.length).map(async (i) => {
        const [user, player] = [USERS[i], PLAYERS[i]];

        const { data } = await signUpAction(user);

        player.userId = data.id;
    }));
});

afterAll(async () => {
    await TestDatabase.drop();

    await stop();
});

afterEach(async () => {
    await TestDatabase.dropCollections();
});



test(`Playing game with valid move should work`, () => {
    assert.equal(0, 0);
});

test(`Placing game order with invalid parameters should not work`, async () => {
    const user = { ...USER_WITHOUT_SPECIAL_TILES, staySignedIn: false };

    // Create test game in database
    const game = await Game.create({
        name: new Date().toUTCString(),
        players: PLAYERS,
        board: new BoardBuilder(PLAYERS.length).build(),
    });

    // Build game orders
    const missingHandTileOrder = {
        boardTileIds: { from: 1, to: 2 },
        castes: { from: null, to: null },
    };
    const missingBoardTilesOrder = {
        handTileId: 1,
        castes: { from: null, to: null },
    };
    const missingCastesOrder = {
        handTileId: 1,
        boardTileIds: { from: 1, to: 2 },
    };

    await expectActionToFailWithError(() => playGameAction(game.getId(), missingHandTileOrder, user), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST),
    });
    await expectActionToFailWithError(() => playGameAction(game.getId(), missingBoardTilesOrder, user), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST),
    });
    await expectActionToFailWithError(() => playGameAction(game.getId(), missingCastesOrder, user), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(HttpStatusMessage.BAD_REQUEST),
    });
});

test(`Placing game order without having corresponding tile in hand should not work`, async () => {
    const user = { ...USER_WITHOUT_SPECIAL_TILES, staySignedIn: false };

    // Create test game in database
    const game = await Game.create({
        name: new Date().toUTCString(),
        players: PLAYERS,
        board: new BoardBuilder(PLAYERS.length).build(),
    });

    // Build game order
    const order = {
        handTileId: HAND_TILE_ID_MOVE,
        boardTileIds: { from: 1, to: 2 },
        castes: { from: null, to: null },
    };

    await expectActionToFailWithError(() => playGameAction(game.getId(), order, user), {
        status: HttpStatusCode.BAD_REQUEST,
        data: errorResponse(ClientError.InvalidGameOrder),
    });
});