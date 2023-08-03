import express, { Router } from 'express';
import { API_VERSION, CLIENT_DIR, STATIC_DIR } from '../config/AppConfig';
import ApiRouter from './api';
import { RequestMiddleware } from '../middleware/RequestMiddleware';



const AppRouter = Router();



// MIDDLEWARE
AppRouter.use(RequestMiddleware);



// Routes
AppRouter.use(`/api/${API_VERSION}`, ApiRouter);
AppRouter.use(`/static`, express.static(STATIC_DIR));

// Client
AppRouter.use('/', express.static(CLIENT_DIR))



export default AppRouter;