import express, { Express } from 'express';
import compression from 'compression';
import AppRouter from './routes';
import { CORS_OPTIONS, ENV, PORT, ROOT, TEST } from './config/AppConfig';
import { logger } from './utils/Logging';
import SessionsDatabase from './databases/SessionsDatabase';
import AppDatabase from './databases/AppDatabase';
import TestDatabase from './databases/TestDatabase';
import http from 'http';
import cors from 'cors';



// App
export const App: Express = express();
export let Server: http.Server;



/* ----------------------------------------------- MIDDLEWARE ----------------------------------------------- */

// JSON
App.use(express.urlencoded({ extended: true }));
App.use(express.json());

// GZIP
App.use(compression());

// CORS
App.use(cors(CORS_OPTIONS));

// API
App.use(AppRouter);



/* -------------------------------------------------- MAIN -------------------------------------------------- */
export const start = async () => {

    // Establish connection with databases
    await SessionsDatabase.start();
    await (TEST ? TestDatabase : AppDatabase).start();

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
    await (TEST ? TestDatabase : AppDatabase).stop();

    Server && Server.close();
}