import { Router } from 'express';
import GetFullHandController from '../../controllers/data/GetFullHandController';



const router = Router();



// ROUTES
router.get('/hand', [], GetFullHandController);



export default router;