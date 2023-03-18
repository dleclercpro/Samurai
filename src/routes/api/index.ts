import { Router } from 'express';
import { RequestMiddleware } from '../../middleware/RequestMiddleware';
import AuthRouter from './auth';
import GameRouter from './game';



const router = Router();



// MIDDLEWARE
router.use(RequestMiddleware);



// ROUTES
// User
router.use(`/auth`, AuthRouter)
router.use(`/game`, GameRouter)



export default router;