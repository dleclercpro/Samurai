import { Size2D, Coordinates2D } from "./types/GameTypes";
import { getHexagonalPath } from "./lib";

// Grid
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
export const PLAYER_COLOR: string = 'red';