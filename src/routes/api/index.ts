import { Router } from 'express';
import { ErrorMiddleware } from '../../middleware/ErrorMiddleware';
import { RequestMiddleware } from '../../middleware/RequestMiddleware';
import AuthRouter from './auth';
import GameRouter from './game';



const router = Router();



// MIDDLEWARE
router.use(RequestMiddleware);



// ROUTES
router.use(`/auth`, AuthRouter);
router.use(`/game`, GameRouter);



// Unknown error
router.use(ErrorMiddleware);



export default router;