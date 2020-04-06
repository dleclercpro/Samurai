import { Size2D, Coordinates2D } from "./types/GameTypes";
import { getHexagonalPath } from "./lib";
import { PlayerJSON } from "./types/JSONTypes";

// Board
export const BOARD_SIZE: Size2D = { width: 14, height: 14 };
export const BOARD_ORIGIN: Coordinates2D = { x: 0, y: 0 };
export const BOARD_ROTATION: number = 60;

// Tiles
export const TILE_SIZE: Size2D = { width: 300, height: 260 };
export const TILE_STROKE: number = 12;
export const TILE_PATH: string = getHexagonalPath(TILE_SIZE, TILE_STROKE);
export const TILE_PATH_BOARD: string = getHexagonalPath(TILE_SIZE, 0); // Superimposing tiles on their contours

// Player
export const HAND_SIZE: number = 5;
export const PLAYER: PlayerJSON = {
    id: 0,
    color: 'red',
    username: 'user0',
    score: {
        'Military': 0,
        'Religion': 0,
        'Commerce': 0,
    },
    isPlaying: true,
};
export const OPPONENTS: PlayerJSON[] = [
    {
        id: 1,
        color: 'blue',
        username: 'user1',
        score: {
            'Military': 0,
            'Religion': 0,
            'Commerce': 0,
        },
        isPlaying: false,
    },
    {
        id: 2,
        color: 'orange',
        username: 'user2',
        score: {
            'Military': 0,
            'Religion': 0,
            'Commerce': 0,
        },
        isPlaying: false,
    },
    {
        id: 3,
        color: 'green',
        username: 'user3',
        score: {
            'Military': 0,
            'Religion': 0,
            'Commerce': 0,
        },
        isPlaying: false,
    },
];