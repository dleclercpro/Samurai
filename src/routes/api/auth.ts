import { Router } from 'express';
import PingController from '../../controllers/auth/PingController';
import SignInController from '../../controllers/auth/SignInController';
import SignUpController from '../../controllers/auth/SignUpController';
import SignOutController from '../../controllers/auth/SignOutController';
import { SessionMiddleware } from '../../middleware/SessionMiddleware';



const router = Router();



// ROUTES
router.post('/', [], SignUpController)
router.get('/', [SessionMiddleware], PingController)
router.get('/sign-in', [], SignInController)
router.get('/sign-out', [SessionMiddleware], SignOutController)



export default router;