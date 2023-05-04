import { readJSONSync } from '../libs/file';

export const BOARD_JSON = readJSONSync('./public/Board.json');
export const HAND_JSON = readJSONSync('./public/Hand.json');