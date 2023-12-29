import express, { Express } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import AppRouter from './routes';
import { CLIENT_ROOT, DEV, ENV, PORT, ROOT, TEST } from './config/AppConfig';
import { logger } from './utils/logging';
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
    // Only use CORS in development to allow communication between
    // React dev server and Express app server
    if (DEV) {
        App.use(cors({
            origin: CLIENT_ROOT,
            methods: ['GET', 'PUT', 'POST', 'DELETE'],
            allowedHeaders: ['X-CSRFToken', 'Accept', 'Content-Type'],
            credentials: true,
        }));
    }

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