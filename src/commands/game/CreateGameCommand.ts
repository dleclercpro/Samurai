import User from '../../models/User';
import Command from '../Command';
import { logger } from '../../utils/Logging';
import Game from '../../models/game/Game';

interface Argument {
    name: string,
    creator: User,
    opponents: User[],
}

type Response = Game;

class CreateGameCommand extends Command<Argument, Response> {

    public constructor(argument: Argument) {
        super('CreateGameCommand', argument);
    }

    protected async doExecute() {
        const { name, creator, opponents } = this.argument;

        logger.info(`User '${creator.getEmail()}' creating a new game.`);

        // Create new game
        const game = await Game.create(name, creator, opponents);
        
        logger.info(`New game created: ${game.getId()}`);

        return game;
    }
}

export default CreateGameCommand;