import express, { Express } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import router from './routes';
import { ENV, PORT, ROOT } from './config/AppConfig';
import { logger } from './utils/Logging';
import SessionsDatabase from './databases/SessionsDatabase';
import AppDatabase from './databases/AppDatabase';
import http from 'http';



// App
export const App: Express = express();
export let Server: http.Server;



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
    await AppDatabase.start();

    // Then start listening on given port
    Server = App.listen(PORT, () => {
        logger.info(`Server listening in '${ENV}' mode at: ${ROOT}`);
    });
}

export const stop = async () => {
    await SessionsDatabase.stop();
    await AppDatabase.stop();

    Server && Server.close();
}