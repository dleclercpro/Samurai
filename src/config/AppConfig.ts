import { getEnvironment } from '../libs';
import { createURL } from '../libs/url';
import { Environment } from '../types';

// Environment
export const ENV = getEnvironment();
export const DEBUG = ENV !== Environment.Production;

// Server
export const PROTOCOL = process.env.PROTOCOL!;
export const HOST = process.env.HOST!;
export const PORT = parseInt(process.env.PORT!);
export const ROOT = `${createURL(PROTOCOL, HOST, PORT)}`;
export const API_VERSION = 'v1';
export const API_ROOT = `${ROOT}/api/${API_VERSION}`;

// Client
export const CLIENT_PROTOCOL = process.env.CLIENT_PROTOCOL!;
export const CLIENT_HOST = process.env.CLIENT_HOST!;
export const CLIENT_PORT = parseInt(process.env.CLIENT_PORT!);
export const CLIENT_ROOT = createURL(CLIENT_PROTOCOL, CLIENT_HOST, CLIENT_PORT);