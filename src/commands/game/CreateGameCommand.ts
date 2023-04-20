import User, { IUser } from '../../models/User';
import { logger } from '../../utils/Logging';
import Game, { IGame } from '../../models/Game';
import { ErrorUserDoesNotExist } from '../../errors/UserErrors';
import { getRandom, shuffle } from '../../libs';
import { Color } from '../../types/GameTypes';
import Command from '../Command';
import BoardBuilder from '../../helpers/BoardBuilder';
import HandBuilder from '../../helpers/HandBuilder';

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
        this.game = new Game({
            name,
            players: this.generatePlayers({ creator, opponents }),
        });

        // Generate board
        this.generateBoard();

        // Store game in database
        await this.game.save();

        // Report its creation
        logger.info(`New game created: ${this.game.getId()}`);

        return this.game;
    }

    private generatePlayers({ creator, opponents }: { creator: IUser, opponents: IUser[] }) {

        // Randomly assign colors to users
        const randomizedColors = shuffle(Object.keys(Color)) as Color[];

        // Randomly decide who starts
        const users = [creator, ...opponents];
        const starter = getRandom(users);

        // Create players
        return users.map((user: IUser, i: number) => ({
            userId: user.getId(),
            isPlaying: user.getId() === starter.getId(),
            isCreator: user.getId() === creator.getId(),
            color: randomizedColors[i],
            hand: new HandBuilder().build(),
        }));
    }

    private generateBoard() {
        const {  opponentEmails } = this.argument;

        if (!this.game) {
            throw new Error('Cannot generate board for a non-existing game!');
        }

        // Use builder to generate board
        this.game.board = new BoardBuilder(opponentEmails.length + 1).build();
    }
}

export default CreateGameCommand;