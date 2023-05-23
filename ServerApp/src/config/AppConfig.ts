import path from 'path';
import { getEnvironment } from '../libs';
import { createURL } from '../libs/url';
import { Environment } from '../types';
import { CorsOptions } from 'cors';

// Environment
export const ENV = getEnvironment();
export const DEBUG = ENV !== Environment.Production;
export const DEV = ENV === Environment.Development;
export const TEST = ENV === Environment.Test;

// Directories
export const PUBLIC_DIR = path.join(__dirname, '../../public');
export const STATIC_DIR = PUBLIC_DIR;

// Server
export const PROTOCOL = process.env.PROTOCOL!;
export const HOST = process.env.HOST!;
export const PORT = parseInt(process.env.PORT!);
export const ROOT = `${createURL(PROTOCOL, HOST, PORT)}`;
export const API_VERSION = 'v1';
export const API_ROOT = `${ROOT}/api/${API_VERSION}`;
export const STATIC_ROOT = `${ROOT}/static`;

// Client
export const CLIENT_PROTOCOL = process.env.CLIENT_PROTOCOL!;
export const CLIENT_HOST = process.env.CLIENT_HOST!;
export const CLIENT_PORT = parseInt(process.env.CLIENT_PORT!);
export const CLIENT_ROOT = createURL(CLIENT_PROTOCOL, CLIENT_HOST, CLIENT_PORT);

// Requests
export const CORS_OPTIONS: CorsOptions = {
    origin: DEV ? CLIENT_ROOT : false,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['X-CSRFToken', 'Accept', 'Content-Type'],
    credentials: true,
};