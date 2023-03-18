import express from 'express';
import compression from 'compression';
import router from './routes';
import { DEBUG, ENV, PORT, ROOT } from './config/AppConfig';
import { logger } from './utils/Logging';
import { MemoryDatabase } from './databases/MemoryDatabase';



/* -------------------------------------------------- INSTANCES -------------------------------------------------- */
// Server
const server = express();

// Database
export const database = MemoryDatabase.get();



/* -------------------------------------------------- OPTIONS -------------------------------------------------- */
// Trust first-level proxy
server.set('trust proxy', 1);



/* -------------------------------------------------- MIDDLEWARE -------------------------------------------------- */

// JSON
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// GZIP
server.use(compression());

// API
server.use('/', router);



/* -------------------------------------------------- MAIN -------------------------------------------------- */
const main = async () => {

    // Then start listening on given port
    server.listen(PORT, () => {
        logger.info(`Server listening in ${ENV} mode at: ${ROOT}`);
    });
}



// Run
main().catch((err) => {
    logger.error(err);
});