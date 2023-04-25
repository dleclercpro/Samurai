import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import router from '../src/routes';
import AppDatabase from '../src/databases/AppDatabase';
import SessionsDatabase from '../src/databases/SessionsDatabase';
import { ENV, PORT, ROOT } from '../src/config/AppConfig';
import { logger } from '../src/utils/Logging';



let server: any;



beforeAll(async () => {

    // App
    const app = express();

    // JSON
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Cookies
    app.use(cookieParser());

    // GZIP
    app.use(compression());

    // API
    app.use('/', router);

    // Establish connection with databases
    await SessionsDatabase.start();
    await AppDatabase.start();

    // Then start listening on given port
    await new Promise<void>((resolve, reject) => {
        try {
            server = app.listen(PORT, () => {
                logger.info(`Server listening in ${ENV} mode at: ${ROOT}`);
    
                resolve();
            });
        } catch (err) {
            reject(err);
        }
    });
});



afterAll(async () => {
    await SessionsDatabase.stop();
    await AppDatabase.stop();

    server.close();
});



test('test', () => {
    expect(1 + 1).toBe(2);
});