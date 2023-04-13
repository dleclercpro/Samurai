import User, { IUser } from '../../models/auth/User';
import { logger } from '../../utils/Logging';
import Game, { IGame } from '../../models/game/Game';
import { ErrorUserDoesNotExist } from '../../errors/UserErrors';
import { getRandom, shuffle } from '../../libs';
import { Color } from '../../types/GameTypes';
import Command from '../Command';

interface Argument {
    name: string,
    creatorEmail: string,
    opponentEmails: string[],
}

type Response = IGame;

class CreateGameCommand extends Command<Argument, Response> {
    private game?: IGame;

    public constructor(argument: Argument) {
        super('CreateGameCommand', argument);
    }

    protected async doPrepare() {
        const { creatorEmail, opponentEmails } = this.argument;

        // Ensure all users exist
        await Promise.all([creatorEmail, ...opponentEmails].map(async (email) => {
            const user = await User.getByEmail(email);

            if (!user) {
                throw new ErrorUserDoesNotExist(email);
            }
        }));
    }

    protected async doExecute() {
        const { name, creatorEmail, opponentEmails } = this.argument;

        // Fetch users
        const [creator, ...opponents] = await Promise.all([creatorEmail, ...opponentEmails].map(async (email) => {
            return User.getByEmail(email);
        }));

        // Create new game
        const game = new Game({
            name,
            players: this.generatePlayers({ creator, opponents }),
        });

        // Store it in database
        await game.save();

        // Report its creation
        logger.info(`New game created: ${game.getId()}`);

        // Store game in command
        this.game = game;

        return game;
    }

    private generatePlayers({ creator, opponents }: { creator: IUser, opponents: IUser[] }) {

        // Randomly assign colors to users
        const randomizedColors = shuffle(Object.keys(Color)) as Color[];

        // Randomly decide who starts
        const users = [creator, ...opponents];
        const starter = getRandom(users);

        // Create players
        return users.map((user: IUser, i: number) => {
            const color = randomizedColors[i];

            return {
                userId: user.getId(),
                isPlaying: user.getId() === starter.getId(),
                isCreator: user.getId() === creator.getId(),
                color,
            };
        });
    }
}

export default CreateGameCommand;