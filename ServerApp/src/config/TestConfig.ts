import { readJSONSync } from '../libs/file';
import { TestBoardJSON, TestOrderJSON } from '../types/JSONTypes';

export const TEST_BOARD_2_PLAYERS_JSON: TestBoardJSON = readJSONSync('./test/data/board2Players.json');
export const TEST_BOARD_3_PLAYERS_JSON: TestBoardJSON = readJSONSync('./test/data/board3Players.json');
export const TEST_BOARD_4_PLAYERS_JSON: TestBoardJSON = readJSONSync('./test/data/board4Players.json');

export const TEST_ORDERS_4_PLAYERS_JSON: TestOrderJSON[] = readJSONSync('./test/data/orders4Players.json');