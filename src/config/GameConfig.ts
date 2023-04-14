import { readJSONSync } from '../libs/file';

export const BOARD_JSON = readJSONSync('./public/board.json');
export const HAND_JSON = readJSONSync('./public/hand.json');