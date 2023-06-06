import { readJSONSync } from '../libs/file';
import { TestBoardJSON, TestOrderJSON } from '../types/JSONTypes';

export const TEST_BOARD_2_PLAYERS_JSON: TestBoardJSON = readJSONSync('./test/data/boards/board2Players.json');
export const TEST_BOARD_3_PLAYERS_JSON: TestBoardJSON = readJSONSync('./test/data/boards/board3Players.json');
export const TEST_BOARD_4_PLAYERS_JSON: TestBoardJSON = readJSONSync('./test/data/boards/board4Players.json');

export const TEST_NORMAL_ORDERS_4_PLAYERS_JSON: TestOrderJSON[] = readJSONSync('./test/data/orders/orders4PlayersNormal.json');
export const TEST_CASTE_TIE_ORDERS_4_PLAYERS_JSON: TestOrderJSON[] = readJSONSync('./test/data/orders/orders4PlayersCasteTie.json');