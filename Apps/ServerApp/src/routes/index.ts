import express, { Router } from 'express';
import { API_VERSION, CLIENT_DIR, CLIENT_ROOT, LOCAL, PROD, PUBLIC_DIR } from '../config/AppConfig';
import ApiRouter from './api';
import { RequestMiddleware } from '../middleware/RequestMiddleware';
import { logger } from '../utils/logging';
import path from 'path';



const AppRouter = Router();



// MIDDLEWARE
AppRouter.use(RequestMiddleware);



// ROUTES
// API
AppRouter.use(`/api/${API_VERSION}`, ApiRouter);

// Static assets
AppRouter.use(`/static`, express.static(PUBLIC_DIR));

// Client app
if (PROD || LOCAL) {

    // Serve React app's static files
    AppRouter.use(express.static(CLIENT_DIR));

    // Define a route that serves the React app
    AppRouter.get('*', (req, res) => {
        const url = path.join(CLIENT_DIR, 'index.html');

        logger.trace(`Serving client app from: ${url}`);

        return res.sendFile(url);
    });

} else {
    
    // Redirect app to React's development server
    AppRouter.get('*', (req, res) => {
        const path = req.originalUrl;
        const url = `${CLIENT_ROOT}${path}`;

        logger.trace(`Redirecting request to: ${url}`);

        return res.redirect(url);
    });
}



export default AppRouter;