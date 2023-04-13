import UserModel, { IUser } from '../../models/auth/User';
import { logger } from '../../utils/Logging';
import GameModel, { IGame } from '../../models/game/Game';
import { ErrorUserDoesNotExist } from '../../errors/UserErrors';
import { shuffle } from '../../libs';
import { Color } from '../../types/GameTypes';
import Command from '../Command';

interface Argument {
    name: string,
    creatorEmail: string,
    opponentEmails: string[],
}

type Response = IGame;

class CreateGameCommand extends Command<Argument, Response> {

    public constructor(argument: Argument) {
        super('CreateGameCommand', argument);
    }

    protected async doPrepare() {
        const { creatorEmail, opponentEmails } = this.argument;

        // Ensure all users exist
        await Promise.all([creatorEmail, ...opponentEmails].map(async (email) => {
            const user = await UserModel.getByEmail(email);

            if (!user) {
                throw new ErrorUserDoesNotExist(email);
            }
        }));
    }

    protected async doExecute() {
        const { name, creatorEmail, opponentEmails } = this.argument;

        // Fetch users
        const [creator, ...opponents] = await Promise.all([creatorEmail, ...opponentEmails].map(async (email) => {
            return UserModel.getByEmail(email);
        }));

        // Create new game
        const game = new GameModel({
            name,
            players: this.generatePlayers({ creator, opponents }),
        });

        // Store it in database
        await game.save();

        // Report its creation
        logger.info(`New game created: ${game.getId()}`);

        return game;
    }

    private generatePlayers({ creator, opponents }: { creator: IUser, opponents: IUser[] }) {

        // Randomly assign colors to users
        const randomizedColors = shuffle(Object.keys(Color)) as Color[];

        // Create players
        return [creator, ...opponents].map((user: IUser, i: number) => {
            const color = randomizedColors[i];

            return {
                userId: user.getId(),
                isCreator: user.getId() === creator.getId(),
                color,
            };
        });
    }
}

export default CreateGameCommand;