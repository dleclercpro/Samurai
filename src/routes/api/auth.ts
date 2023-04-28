import { Router } from 'express';
import PingController from '../../controllers/auth/PingController';
import SignInController from '../../controllers/auth/SignInController';
import SignUpController from '../../controllers/auth/SignUpController';
import SignOutController from '../../controllers/auth/SignOutController';
import { SessionMiddleware } from '../../middleware/SessionMiddleware';
import { SignInValidation } from '../../middleware/validation/SignInValidation';
import { SignInSanitization } from '../../middleware/sanitization/SignInSanitization';
import { SignUpValidation } from '../../middleware/validation/SignUpValidation';
import { SignUpSanitization } from '../../middleware/sanitization/SignUpSanitization';



const router = Router();



// ROUTES
router.get('/', [SessionMiddleware], PingController);
router.post('/', [SignUpValidation, SignUpSanitization], SignUpController);
router.get('/sign-in', [SignInValidation, SignInSanitization], SignInController);
router.get('/sign-out', [SessionMiddleware], SignOutController);



export default router;