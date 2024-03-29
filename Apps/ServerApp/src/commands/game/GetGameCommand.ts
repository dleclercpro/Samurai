import { ErrorGameDoesNotExist, ErrorGameVersionDoesNotExist } from '../../errors/GameErrors';
import Command from '../Command';
import Game, { IGame } from '../../models/Game';
import { IUser } from '../../models/User';

interface Argument {
    id: string,
    version: number,
    user: IUser,
}

type Response = IGame | null;

class GetGameCommand extends Command<Argument, Response> {
    private game?: IGame;

    public constructor(argument: Argument) {
        super('GetGameCommand', argument);
    }

    protected async doPrepare() {
        const { id, user } = this.argument;

        // Try and find user in database
        const game = await Game.getById(id);

        // Game should exist in database
        if (!game) {
            throw new ErrorGameDoesNotExist(id);
        }

        // Ensure user is playing in this game
        game.getPlayerByUser(user);

        // Store game in command
        this.game = game;
    }

    protected async doExecute() {
        const { version } = this.argument;
        const game = this.game!;
        const now = new Date();

        // If version is higher than the current one, or
        // smaller than zero, it is invalid
        if (version < 0 || version > game.getVersion()) {
            throw new ErrorGameVersionDoesNotExist(version);
        }

        // Update game's last seen time
        game.setLastViewedTime(now);

        // No need to send details back if client's game details
        // are already up-to-date, unless game is in its initial
        // state
        if (version !== 0 && version === game.getVersion()) {
            return null;
        }

        return game;
    }
}

export default GetGameCommand;