import { getRange } from './utils/math';
import { Caste, Color } from './types/GameTypes';

/* ----- MONGOOSE ----- */
export const SUBDOCUMENT_SCHEMA_OPTIONS = {
    autoCreate: false, // Do not create collection automatically
};



/* ----- GAME ----- */
// Hand tiles
export const HAND_TILE_ID_SWAP = 18;
export const HAND_TILE_ID_MOVE = 19;
export const HAND_SIZE = 5;
export const N_FULL_HAND_TILES = 20;
export const FULL_HAND_TILE_IDS = getRange(N_FULL_HAND_TILES);

// Board tiles
export const BOARD_TILE_SWAP_IDS = [200, 201, 202, 203];

// Players
export const PLAYER_COUNT_MIN = 2;
export const PLAYER_COUNT_MAX = 4;

// Version
export const GAME_INIT_VERSION = 0;

// Colors
export const COLORS = Object.values(Color);

// Castes
export const CASTES = Object.values(Caste);

// Score
export const INIT_SCORE: Record<Caste, number> = {
    [Caste.Military]: 0,
    [Caste.Religion]: 0,
    [Caste.Commerce]: 0,
};