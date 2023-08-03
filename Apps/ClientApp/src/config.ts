import { Size2D, Coordinates2D } from './types/GameTypes';
import { getHexagonalPath } from './lib';

// Environment
export const DEV = process.env.NODE_ENV === 'development';
export const DEBUG = process.env.REACT_APP_DEBUG === 'true';

// Board
export const BOARD_SIZE: Size2D = { width: 12, height: 12 };
export const BOARD_ORIGIN: Coordinates2D = { x: -2.15, y: 0.25 };
export const BOARD_ROTATION: number = 60;

// Tiles
export const TILE_SIZE: Size2D = { width: 300, height: 260 };
export const TILE_STROKE: number = 12;
export const TILE_PATH: string = getHexagonalPath(TILE_SIZE, TILE_STROKE);
export const TILE_PATH_BOARD: string = getHexagonalPath(TILE_SIZE, 0); // Superimposing tiles on their contours

// Server
export const SERVER_URL = DEV ? 'http://localhost:8000' : '';
export const API_URL = `${SERVER_URL}/api/v1`;
export const POLL_RATE = 5 * 1000;      // ms
export const FETCH_DEFAULT_TIMEOUT = 2000; // ms
export const MAX_POLL_RETRIES = 5;

// FX
export const FX_SOUND_NEW_TURN = `${SERVER_URL}/static/new-turn.wav`;
export const FX_SOUND_GAME_OVER = `${SERVER_URL}/static/game-over.wav`;