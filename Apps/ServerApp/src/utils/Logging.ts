import pino from 'pino';
import { ENV } from '../config/AppConfig';
import { Environment } from '../types';

const DEV_OPTIONS = {
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
        case Environment.Development:
            return DEV_OPTIONS;
        case Environment.Test:
            return TEST_OPTIONS;
        case Environment.Production:
            return PROD_OPTIONS;
    }
}

export const logger = pino(getOptions());
export const createLogger = (name: string) => pino({ name, ...getOptions()});