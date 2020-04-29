import { Caste, Figure } from "./types/GameTypes";

export const MIN_IN_MS = 60 * 1000;

export const KEY_ENTER_ID = 13;
export const KEY_ESC_ID = 27;

export const TILE_SWITCH_ID = 18;
export const TILE_MOVE_ID = 19;

export const CASTES = [ Caste.Military, Caste.Religion, Caste.Commerce ];
export const MOVABLE_CASTES = [ Caste.Military, Caste.Religion, Caste.Commerce, Figure.Samurai ];