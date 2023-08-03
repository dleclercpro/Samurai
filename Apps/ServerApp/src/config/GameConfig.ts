import { readJSONSync } from '../utils/file';

export const BOARD_JSON_FILENAME = 'board.json';
export const FULL_HAND_JSON_FILENAME = 'hand.json';
export const BOARD_JSON = readJSONSync(`./public/${BOARD_JSON_FILENAME}`);
export const FULL_HAND_JSON = readJSONSync(`./public/${FULL_HAND_JSON_FILENAME}`);