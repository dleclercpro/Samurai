import pino from 'pino';
import { ENV } from '../config/AppConfig';
import { Environment } from '../types';

const DEBUG_OPTIONS = {
    level: 'trace',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
        },
    },
};

const TEST_OPTIONS = {
    level: 'trace',
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

const getOptions = () => {
    switch (ENV) {
        case Environment.Test:
            return TEST_OPTIONS;
        case Environment.Production:
            return PROD_OPTIONS;
        default:
            return DEBUG_OPTIONS;
    }
}

export const logger = pino(getOptions());
export const createLogger = (name: string) => pino({ name, ...getOptions()});