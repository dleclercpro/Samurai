import { start, stop } from '../../src/app';
import TestDatabase from '../../src/databases/TestDatabase';
import HandBuilder from '../../src/helpers/builders/HandBuilder';
import { HAND_TILE_ID_MOVE, HAND_TILE_ID_SWAP } from '../../src/constants';
import Player from '../../src/models/Player';
import { Color } from '../../src/types/GameTypes';
import Game from '../../src/models/Game';
import { signUpAction } from '../actions';
import { getRange } from '../../src/libs/math';
import TestBoardBuilder from '../../src/helpers/builders/TestBoardBuilder';

export const HAND_TILE_ID_MILITARY = 0;
export const HAND_TILE_ID_RELIGION = 1;
export const HAND_TILE_ID_COMMERCE = 2;
export const HAND_TILE_ID_SAMURAI = 10;
export const HAND_TILE_ID_SHIP = 15;

export const BOARD_TILE_ID_CITY = 82;

export const USER = { email: 'user4@test.com', password: 'q12345678!', username: 'UserWithoutSpecialTiles' };
export const USER_WITH_MOVE = { email: 'user1@test.com', password: 'q12345678!', username: 'UserWithMove' };
export const USER_WITH_SWAP = { email: 'user2@test.com', password: 'q12345678!', username: 'UserWithSwap' };
export const USER_WITH_MOVE_AND_SWAP = { email: 'user3@test.com', password: 'q12345678!', username: 'UserWithMoveAndSwap' };

export const PLAYER_WITH_MOVE = new Player({
    userId: '',
    isPlaying: true,
    isCreator: true,
    color: Color.Purple,
    hand: new HandBuilder().build([
        HAND_TILE_ID_MILITARY,
        HAND_TILE_ID_RELIGION,
        HAND_TILE_ID_COMMERCE,
        HAND_TILE_ID_SAMURAI,
        HAND_TILE_ID_MOVE,
    ]),
});

export const PLAYER_WITH_SWAP = new Player({
    userId: '',
    isPlaying: false,
    isCreator: false,
    color: Color.Orange,
    hand: new HandBuilder().build([
        HAND_TILE_ID_MILITARY,
        HAND_TILE_ID_RELIGION,
        HAND_TILE_ID_COMMERCE,
        HAND_TILE_ID_SAMURAI,
        HAND_TILE_ID_SWAP,
    ]),
});

export const PLAYER_WITH_MOVE_AND_SWAP = new Player({
    userId: '',
    isPlaying: false,
    isCreator: false,
    color: Color.Green,
    hand: new HandBuilder().build([
        HAND_TILE_ID_MILITARY,
        HAND_TILE_ID_RELIGION,
        HAND_TILE_ID_COMMERCE,
        HAND_TILE_ID_MOVE,
        HAND_TILE_ID_SWAP,
    ]),
});

export const PLAYER_WITHOUT_SPECIAL_TILES = new Player({
    userId: '',
    isPlaying: false,
    isCreator: false,
    color: Color.Red,
    hand: new HandBuilder().build([
        HAND_TILE_ID_MILITARY,
        HAND_TILE_ID_RELIGION,
        HAND_TILE_ID_COMMERCE,
        HAND_TILE_ID_SAMURAI,
        HAND_TILE_ID_SHIP,
    ]),
});

export const USERS = [
    USER_WITH_MOVE,
    USER_WITH_SWAP,
    USER_WITH_MOVE_AND_SWAP,
    USER,
];

export const PLAYERS = [
    PLAYER_WITH_MOVE,
    PLAYER_WITH_SWAP,
    PLAYER_WITH_MOVE_AND_SWAP,
    PLAYER_WITHOUT_SPECIAL_TILES,
];

export const BOARD = new TestBoardBuilder(PLAYERS.length).build();



export const createGame = async () => {
    return await Game.create({
        name: new Date().toUTCString(),
        players: PLAYERS,
        board: BOARD,
    });
};



export const beforeAllPlay = async () => {
    await start();
};

export const beforeEachPlay = async () => {

    // Create users and generate players with their IDs
    await Promise.all(getRange(USERS.length).map(async (i) => {
        const [user, player] = [USERS[i], PLAYERS[i]];

        const { data } = await signUpAction(user);

        player.userId = data.id;
    }));
};

export const afterAllPlay = async () => {
    await TestDatabase.drop();

    await stop();
};

export const afterEachPlay = async () => {
    await TestDatabase.dropCollections();
};