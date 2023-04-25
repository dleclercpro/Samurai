import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import router from './routes';
import { ENV, PORT, ROOT } from './config/AppConfig';
import { logger } from './utils/Logging';
import SessionsDatabase from './databases/SessionsDatabase';
import AppDatabase from './databases/AppDatabase';



// App
export const app = express();



/* ----------------------------------------------- MIDDLEWARE ----------------------------------------------- */

// JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cookies
app.use(cookieParser());

// GZIP
app.use(compression());

// API
app.use('/', router);



/* -------------------------------------------------- MAIN -------------------------------------------------- */
export const main = async () => {

    // Establish connection with databases
    await SessionsDatabase.start();
    await AppDatabase.start();

    // Then start listening on given port
    const server = app.listen(PORT, () => {
        logger.info(`Server listening in ${ENV} mode at: ${ROOT}`);
    });
}



// Run
main().catch(async (err) => {
    logger.fatal(err);

    await SessionsDatabase.stop();
    await AppDatabase.stop();
});