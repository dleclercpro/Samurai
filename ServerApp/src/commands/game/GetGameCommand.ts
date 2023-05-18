import { ErrorGameDoesNotExist, ErrorGameVersionDoesNotExist } from '../../errors/GameErrors';
import Command from '../Command';
import Game, { IGame } from '../../models/Game';

interface Argument {
    id: string,
    version: number,
}

type Response = IGame | null;

class GetGameCommand extends Command<Argument, Response> {
    private game?: IGame;

    public constructor(argument: Argument) {
        super('GetGameCommand', argument);
    }

    protected async doPrepare() {
        const { id } = this.argument;

        // Try and find user in database
        const game = await Game.getById(id);

        // Game should exist in database
        if (!game) {
            throw new ErrorGameDoesNotExist(id);
        }

        // Store game in command
        this.game = game;
    }

    protected async doExecute() {
        const { version } = this.argument;
        const game = this.game!;

        // If version is higher than the current one, there's a problem
        if (version > game.getVersion()) {
            throw new ErrorGameVersionDoesNotExist(version);
        }

        // No need to send details back if client's game details
        // are already up-to-date
        if (version === game.getVersion()) {
            return null;
        }

        return game;
    }
}

export default GetGameCommand;