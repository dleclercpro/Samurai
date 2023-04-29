import { Router } from 'express';
import CreateGameController from '../../controllers/game/CreateGameController';
import PlayGameController from '../../controllers/game/PlayGameController';
import GetGameController from '../../controllers/game/GetGameController';
import { SessionMiddleware } from '../../middleware/SessionMiddleware';
import { PlayGameValidation } from '../../middleware/validation/PlayGameValidation';
import { PlayGameSanitization } from '../../middleware/sanitization/PlayGameSanitization';
import { CreateGameValidation } from '../../middleware/validation/CreateGameValidation';
import { CreateGameSanitization } from '../../middleware/sanitization/CreateGameSanitization';



const router = Router();



// Every game route has to be authenticated
router.use(SessionMiddleware);



// ROUTES
router.post('/', [CreateGameValidation, CreateGameSanitization], CreateGameController);
router.get('/:id', GetGameController);
router.post('/:id', [PlayGameValidation, PlayGameSanitization], PlayGameController);



export default router;