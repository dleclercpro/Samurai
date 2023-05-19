import { start, stop } from '../../src/app';
import TestDatabase from '../../src/databases/TestDatabase';
import HandBuilder from '../../src/helpers/builders/HandBuilder';
import { HAND_TILE_ID_MOVE, HAND_TILE_ID_SWAP } from '../../src/constants';
import Player, { IPlayer } from '../../src/models/Player';
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

export const USER = { email: 'user1@test.com', password: 'q12345678!', username: 'User' };
export const USER_WITH_MOVE = { email: 'user2@test.com', password: 'q12345678!', username: 'UserWithMove' };
export const USER_WITH_SWAP = { email: 'user3@test.com', password: 'q12345678!', username: 'UserWithSwap' };
export const USER_WITH_MOVE_AND_SWAP = { email: 'user4@test.com', password: 'q12345678!', username: 'UserWithMoveAndSwap' };

export const PLAYER = new Player({
    userId: '',
    isPlaying: false,
    isCreator: true,
    color: Color.Red,
    hand: new HandBuilder().build([
        HAND_TILE_ID_MILITARY,
        HAND_TILE_ID_RELIGION,
        HAND_TILE_ID_COMMERCE,
        HAND_TILE_ID_SAMURAI,
        HAND_TILE_ID_SHIP,
    ]),
});

export const PLAYER_WITH_MOVE = new Player({
    userId: '',
    isPlaying: false,
    isCreator: false,
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



export const USERS: Record<string, any> = {
    'USER': USER,
    'USER_WITH_MOVE': USER_WITH_MOVE,
    'USER_WITH_SWAP': USER_WITH_SWAP,
    'USER_WITH_MOVE_AND_SWAP': USER_WITH_MOVE_AND_SWAP,
};

export const PLAYERS: Record<string, IPlayer> = {
    'PLAYER': PLAYER,
    'PLAYER_WITH_MOVE': PLAYER_WITH_MOVE,
    'PLAYER_WITH_SWAP': PLAYER_WITH_SWAP,
    'PLAYER_WITH_MOVE_AND_SWAP': PLAYER_WITH_MOVE_AND_SWAP,
};

export const BOARD = new TestBoardBuilder(Object.keys(PLAYERS).length).build();



export const createGame = async (currentPlayer: string) => {
    const players = Object.values(PLAYERS).map(player => {
        player.setIsPlaying(player === PLAYERS[currentPlayer]);

        return player;
    });

    return await Game.create({
        name: new Date().toUTCString(),
        players,
        board: BOARD,
    });
};



export const beforeAllPlay = async () => {
    await start();
};

export const beforeEachPlay = async () => {

    // Create users and generate players with their IDs
    await Promise.all(getRange(Object.keys(USERS).length).map(async (i) => {

        // FIXME: Object.values not always give values in same order?
        const [user, player] = [Object.values(USERS)[i], Object.values(PLAYERS)[i]];

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