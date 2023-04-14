import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import router from './routes';
import { ENV, PORT, ROOT } from './config/AppConfig';
import { logger } from './utils/Logging';
import SessionsDatabase from './databases/SessionsDatabase';
import AppDatabase from './databases/AppDatabase';
import BoardBuilder from './helpers/BoardBuilder';



// Server
export const server = express();



/* ----------------------------------------------- MIDDLEWARE ----------------------------------------------- */

// JSON
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Cookies
server.use(cookieParser());

// GZIP
server.use(compression());

// API
server.use('/', router);



/* -------------------------------------------------- MAIN -------------------------------------------------- */
const main = async () => {

    // Establish connection with databases
    await SessionsDatabase.start();
    await AppDatabase.start();

    // Then start listening on given port
    server.listen(PORT, () => {
        logger.info(`Server listening in ${ENV} mode at: ${ROOT}`);

        const builder = new BoardBuilder(2);
        const board = builder.build();
    });
}



// Run
main().catch((err) => {
    logger.fatal(err);
});