import pino from 'pino';
import { DEBUG } from '../config/AppConfig';

const DEV_OPTIONS = {
    level: 'debug',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
        },
    },
};

const PROD_OPTIONS = {
    level: 'info',
};

export const logger = pino(DEBUG ? DEV_OPTIONS : PROD_OPTIONS);
export const createLogger = (name: string) => pino(DEBUG ? { name, ...DEV_OPTIONS} : { name, ...PROD_OPTIONS });