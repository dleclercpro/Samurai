import express, { Express } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import AppRouter from './routes';
import { CORS_OPTIONS, ENV, PORT, ROOT, TEST } from './config/AppConfig';
import { logger } from './utils/Logging';
import SessionsDatabase from './databases/SessionsDatabase';
import AppDatabase from './databases/AppDatabase';
import TestDatabase from './databases/TestDatabase';
import http from 'http';
import cors from 'cors';



const App: Express = express();
let Server: http.Server;



export const start = async () => {

    // JSON
    App.use(express.urlencoded({ extended: true }));
    App.use(express.json());

    // Cookies
    App.use(cookieParser());

    // GZIP
    App.use(compression());

    // CORS
    App.use(cors(CORS_OPTIONS));

    // API
    App.use(AppRouter);

    // Establish connection with databases
    await SessionsDatabase.start();
    await (TEST ? TestDatabase : AppDatabase).start();

    // Then start listening on given port
    return new Promise<void>((resolve) => {
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