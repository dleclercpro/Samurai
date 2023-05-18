import { Router } from 'express';
import HealthController from '../../controllers/HealthController';



const router = Router();



// ROUTES
router.get('', HealthController);



export default router;