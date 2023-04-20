import { Router } from 'express';
import CreateGameController from '../../controllers/game/CreateGameController';
import PlayGameController from '../../controllers/game/PlayGameController';
import GetGameController from '../../controllers/game/GetGameController';
import { SessionMiddleware } from '../../middleware/SessionMiddleware';



const router = Router();



// ROUTES
router.post('/', [SessionMiddleware], CreateGameController);
router.post('/:id', [SessionMiddleware], PlayGameController);
router.get('/:id', [SessionMiddleware], GetGameController);



export default router;