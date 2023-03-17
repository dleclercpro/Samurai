import { Router } from 'express';
import PingController from '../controllers/PingController';
import { RequestMiddleware } from '../middleware/RequestMiddleware';
import SignInController from '../controllers/user/SignInController';
import SignUpController from '../controllers/user/SignUpController';
import SignOutController from '../controllers/user/SignOutController';
import CreateGameController from '../controllers/game/CreateGameController';
import PlayGameController from '../controllers/game/PlayGameController';
import GetGameController from '../controllers/game/GetGameController';



const router = Router();



// MIDDLEWARE
router.use(RequestMiddleware);



// ROUTES
// User
router.post('/user', SignUpController)
router.get('/user', PingController)
router.get('/user/sign-in', SignInController)
router.get('/user/sign-out', SignOutController)

// Game
router.post('/game', CreateGameController)
router.post('/game/:gameId', PlayGameController)
router.get('/game/:gameId', GetGameController)



export default router;