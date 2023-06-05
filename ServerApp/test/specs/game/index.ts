import { start, stop } from '../../../src/app';
import TestDatabase from '../../../src/databases/TestDatabase';
import HandBuilder from '../../../src/helpers/builders/HandBuilder';
import { HAND_TILE_ID_MOVE, HAND_TILE_ID_SWAP } from '../../../src/constants';
import Player, { IPlayer } from '../../../src/models/Player';
import { Color } from '../../../src/types/GameTypes';
import Game from '../../../src/models/Game';
import { signOutAction, signUpAction } from '../../actions/AuthActions';
import { getRange } from '../../../src/libs/math';
import TestBoardBuilder from '../../../src/helpers/builders/TestBoardBuilder';
import { ErrorGameInvalidPlayerCount } from '../../../src/errors/GameErrors';



export const HAND_TILE_ID_MILITARY = 0;
export const HAND_TILE_ID_RELIGION = 1;
export const HAND_TILE_ID_COMMERCE = 2;
export const HAND_TILE_ID_SAMURAI = 14;
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
        HAND_TILE_ID_SAMURAI,
        HAND_TILE_ID_SHIP,
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
        HAND_TILE_ID_SHIP,
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
export const USER_NAMES = ['USER', 'USER_WITH_MOVE', 'USER_WITH_SWAP', 'USER_WITH_MOVE_AND_SWAP'];

export const PLAYERS: Record<string, IPlayer> = {
    'PLAYER': PLAYER,
    'PLAYER_WITH_MOVE': PLAYER_WITH_MOVE,
    'PLAYER_WITH_SWAP': PLAYER_WITH_SWAP,
    'PLAYER_WITH_MOVE_AND_SWAP': PLAYER_WITH_MOVE_AND_SWAP,
};
export const PLAYER_NAMES = ['PLAYER', 'PLAYER_WITH_MOVE', 'PLAYER_WITH_SWAP', 'PLAYER_WITH_MOVE_AND_SWAP'];

const BOARD_2_PLAYERS = new TestBoardBuilder(2).build();
const BOARD_3_PLAYERS = new TestBoardBuilder(3).build();
const BOARD_4_PLAYERS = new TestBoardBuilder(4).build();



export const createGame = async (playerNames: string[] = PLAYER_NAMES, currentPlayerName: string = 'PLAYER') => {
    const now = new Date();
    
    const players = playerNames.map(name => {
        const player = PLAYERS[name];
        
        player.setIsPlaying(player === PLAYERS[currentPlayerName]);

        return player;
    });

    let board;
    switch (playerNames.length) {
        case 2:
            board = BOARD_2_PLAYERS;
            break;
        case 3:
            board = BOARD_3_PLAYERS;
            break;
        case 4:
            board = BOARD_4_PLAYERS;
            break;
        default:
            throw new ErrorGameInvalidPlayerCount(playerNames.length);
    }

    return await Game.create({
        name: now.toUTCString(),
        players,
        board,
    });
};



const signUpUsers = async () => {
    const users = USER_NAMES.map(name => USERS[name]);
    const players = PLAYER_NAMES.map(name => PLAYERS[name]);

    await Promise.all(getRange(users.length).map(async (i) => {
        const [user, player] = [users[i], players[i]];

        const { data } = await signUpAction(user);

        // Link player to user
        player.userId = data.id;
    }));
}



export const beforeAllPlay = async () => {
    await start();
};

export const beforeEachPlay = async () => {

    // Create users and generate players with their IDs
    await signUpUsers();
};

export const afterAllPlay = async () => {
    await TestDatabase.drop();

    await stop();
};

export const afterEachPlay = async () => {
    try {
        await signOutAction();
    } catch (err: any) {

    }

    await TestDatabase.dropCollections();
};