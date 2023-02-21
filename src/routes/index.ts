import { Router } from 'express';
import PingController from '../controllers/PingController';
import { RequestMiddleware } from '../middleware/RequestMiddleware';
import TestController from '../controllers/TestController';



const router = Router();



// MIDDLEWARE
router.use(RequestMiddleware);



// ROUTES
router.get('/ping', PingController);
router.get('/test', TestController);



export default router;