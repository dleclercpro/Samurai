import { getEnvironment } from '../libs';
import { createURL } from '../libs/url';
import { Environment } from '../types';
import { TimeUnit } from '../types/TimeTypes';

// Environment
export const ENV = getEnvironment();
export const DEBUG = ENV !== Environment.Production;

// Server
export const PROTOCOL = process.env.PROTOCOL!;
export const HOST = process.env.HOST!;
export const PORT = parseInt(process.env.PORT!);
export const ROOT = `${createURL(PROTOCOL, HOST, PORT)}/`;
export const API_VERSION = 'v1';

// Client
export const CLIENT_PROTOCOL = process.env.CLIENT_PROTOCOL!;
export const CLIENT_HOST = process.env.CLIENT_HOST!;
export const CLIENT_PORT = parseInt(process.env.CLIENT_PORT!);
export const CLIENT_ROOT = createURL(CLIENT_PROTOCOL, CLIENT_HOST, CLIENT_PORT);

// Databases
export const APP_DB_OPTIONS = {
    host: process.env.APP_DB_HOST!,
    port: parseInt(process.env.APP_DB_PORT!),
    name: process.env.APP_DB_NAME!,
    auth: DEBUG ? undefined : {
        user: process.env.APP_DB_USER!,
        pass: process.env.APP_DB_PASS!,
    },
};

export const SESSIONS_DB_OPTIONS = {
    host: process.env.SESSIONS_DB_HOST!,
    port: parseInt(process.env.SESSIONS_DB_PORT!),
    name: process.env.SESSIONS_DB_NAME!,
    auth: DEBUG ? undefined : {
        user: process.env.SESSIONS_DB_USER!,
        pass: process.env.SESSIONS_DB_PASS!,
    },
};

export const DB_RETRY_CONNECT_MAX_DELAY = { time: 3, unit: TimeUnit.Second };
export const DB_RETRY_CONNECT_TIMEOUT = { time: 5, unit: TimeUnit.Second };
export const DB_RETRY_CONNECT_MAX = 5;

export const PATH_BOARD_JSON = './public/board.json';
export const PATH_HAND_JSON = './public/hand.json';