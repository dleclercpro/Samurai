import { Router } from 'express';
import { ErrorMiddleware } from '../../middleware/ErrorMiddleware';
import HealthRouter from './health';
import AuthRouter from './auth';
import GameRouter from './game';



const router = Router();



// ROUTES
router.use(`/health`, HealthRouter);
router.use(`/auth`, AuthRouter);
router.use(`/game`, GameRouter);



// Unknown error
router.use(ErrorMiddleware);



export default router;