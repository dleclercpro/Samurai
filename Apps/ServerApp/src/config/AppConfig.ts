import path from 'path';
import { Environment } from '../types';
import { getEnvironment } from '../utils';
import { createURL } from '../utils/url';

// Environment
export const ENV = getEnvironment();
export const DEV = ENV === Environment.Development;
export const PROD = ENV === Environment.Production;
export const LOCAL = ENV === Environment.Local;
export const TEST = ENV === Environment.Test;
export const DEBUG = [Environment.Development, Environment.Test].includes(ENV as Environment);

// Directories
export const PUBLIC_DIR = path.join(__dirname, '../../public');
export const CLIENT_DIR = path.join(__dirname, '../../client');

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