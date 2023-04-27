import express, { Express } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import router from './routes';
import { ENV, PORT, ROOT } from './config/AppConfig';
import { logger } from './utils/Logging';
import SessionsDatabase from './databases/SessionsDatabase';
import AppDatabase from './databases/AppDatabase';
import TestDatabase from './databases/TestDatabase';
import http from 'http';
import { Environment } from './types';



// App
export const App: Express = express();
export let Server: http.Server;
export const AppDB = ENV === Environment.Test ? TestDatabase : AppDatabase;



/* ----------------------------------------------- MIDDLEWARE ----------------------------------------------- */

// JSON
App.use(express.urlencoded({ extended: true }));
App.use(express.json());

// Cookies
App.use(cookieParser());

// GZIP
App.use(compression());

// API
App.use('/', router);



/* -------------------------------------------------- MAIN -------------------------------------------------- */
export const start = async () => {

    // Establish connection with databases
    await SessionsDatabase.start();
    await AppDB.start();

    // Then start listening on given port
    return new Promise<void>((resolve, reject) => {
        Server = App.listen(PORT, () => {
            logger.info(`Server listening in '${ENV}' mode at: ${ROOT}`);
            
            resolve();
        });
    });
}

export const stop = async () => {
    await SessionsDatabase.stop();
    await AppDB.stop();

    Server && Server.close();
}