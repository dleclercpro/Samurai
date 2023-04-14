import { TimeUnit } from '../types/TimeTypes';
import { DEBUG } from './AppConfig';

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