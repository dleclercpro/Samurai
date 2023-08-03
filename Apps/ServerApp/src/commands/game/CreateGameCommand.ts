import User, { IUser } from '../../models/User';
import { logger } from '../../utils/logging';
import Game, { IGame } from '../../models/Game';
import { ErrorUserDoesNotExist } from '../../errors/UserErrors';
import { Color } from '../../types/GameTypes';
import Command from '../Command';
import BoardBuilder from '../../helpers/builders/BoardBuilder';
import HandBuilder from '../../helpers/builders/HandBuilder';
import { ErrorGameDuplicateUsers, ErrorGameNotEnoughPlayers, ErrorGameTooManyPlayers } from '../../errors/GameErrors';
import { PLAYER_COUNT_MAX, PLAYER_COUNT_MIN } from '../../constants';
import { unique, shuffle } from '../../utils';

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
        const emails = [creatorEmail, ...opponentEmails];
        const nPlayers = emails.length;

        // Ensure min/max player count is respected
        if (nPlayers < PLAYER_COUNT_MIN) {
            throw new ErrorGameNotEnoughPlayers(nPlayers);
        }
        if (nPlayers > PLAYER_COUNT_MAX) {
            throw new ErrorGameTooManyPlayers(nPlayers);
        }

        // Ensure all users are different
        if (unique(emails).length !== emails.length) {
            throw new ErrorGameDuplicateUsers();
        }

        // Ensure all users exist
        await Promise.all(emails.map(async (email) => {
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
        const users = [creator, ...opponents];
        const emails = users.map(user => user.getEmail()).join(', ')

        // Report upcoming action
        logger.info(`Creating game with users: ${emails}.`);

        // Create new game
        this.game = await Game.create({
            name,
            players: this.generatePlayers({ creator, opponents }),
            board: this.generateBoard(),
        });

        // Report its creation
        logger.info(`New game created: ${this.game.getId()}`);

        return this.game;
    }

    private generatePlayers({ creator, opponents }: { creator: IUser, opponents: IUser[] }) {

        // Randomize color order
        const randomizedColors = shuffle(Object.keys(Color)) as Color[];

        // Randomize player order
        const randomizedUsers = shuffle([creator, ...opponents]);

        // Create players
        return randomizedUsers.map((user: IUser, i: number) => ({
            userId: user.getId(),
            isPlaying: i === 0,
            isCreator: user.getId() === creator.getId(),
            color: randomizedColors[i],
            hand: new HandBuilder().build(),
        }));
    }

    private generateBoard() {
        const { opponentEmails } = this.argument;

        // Use builder to generate board
        return new BoardBuilder(opponentEmails.length + 1).build();
    }
}

export default CreateGameCommand;