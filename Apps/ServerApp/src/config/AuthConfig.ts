import { CookieOptions } from 'express';
import { TimeUnit } from '../types/TimeTypes';
import { DEBUG, PROD } from './AppConfig';

export const N_PASSWORD_SALT_ROUNDS = 12;
export const PASSWORD_OPTIONS = {
    minLength: 8,
    minNumbers: 1,
    minSymbols: 1,
};

const SESSION_COOKIE_OPTIONS: CookieOptions = {
    path: '/',
    httpOnly: PROD,
    secure: PROD,
    sameSite: DEBUG ? 'none' : 'strict',
}

export const SESSION_OPTIONS = {
    duration: { time: 15, unit: TimeUnit.Minute },
    secret: process.env.JWT_SESSION_SECRET!,
    cookie: {
        name: process.env.SESSION_COOKIE_NAME!,
        secret: process.env.JWT_COOKIE_SECRET!,
        options: SESSION_COOKIE_OPTIONS,
    },
};