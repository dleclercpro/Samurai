import { Caste } from './types/GameTypes';

/* ----- MONGOOSE ----- */
export const SUBDOCUMENT_SCHEMA_OPTIONS = {
    autoCreate: false, // Do not create collection automatically
};



/* ----- GAME ----- */
// Tiles
export const HAND_TILE_ID_SWAP = 18;
export const HAND_TILE_ID_MOVE = 19;
export const BOARD_TILE_SWAP_IDS = [200, 201, 202, 203];

// Numbers
export const N_FULL_HAND_TILES = 20;
export const N_HAND_TILES = 5;

// Players
export const GAME_PLAYER_COUNT_MIN = 2;
export const GAME_PLAYER_COUNT_MAX = 4;

// Version
export const GAME_INIT_VERSION = 0;

// Castes
export const CASTES = Object.values(Caste);