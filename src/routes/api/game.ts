import { Router } from 'express';
import CreateGameController from '../../controllers/game/CreateGameController';
import PlayGameController from '../../controllers/game/PlayGameController';
import GetGameController from '../../controllers/game/GetGameController';



const router = Router();



// ROUTES
router.post('/', CreateGameController)
router.post('/:gameId', PlayGameController)
router.get('/:gameId', GetGameController)



export default router;