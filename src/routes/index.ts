import { Router } from 'express';
import { API_VERSION } from '../config/AppConfig';
import ApiRouter from './api';



const router = Router();



// Routes
router.use(`/api/${API_VERSION}`, ApiRouter);



export default router;