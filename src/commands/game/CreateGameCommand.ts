import UserModel, { IUser } from '../../models/auth/User';
import Command from '../Command';
import { logger } from '../../utils/Logging';
import GameModel, { IGame } from '../../models/game/Game';
import { ErrorUserDoesNotExist } from '../../errors/UserErrors';
import { shuffle } from '../../libs';
import { Color } from '../../types/GameTypes';
import PlayerModel from '../../models/game/Player';
import { getRange } from '../../libs/math';
import AppDatabase from '../../databases/AppDatabase';

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

    protected async doExecute() {
        const session = await AppDatabase.startSession();

        try {
            const { name, creatorEmail, opponentEmails } = this.argument;

            // Start transaction with database
            session.startTransaction();

            // Ensure all users exist
            const [creator, ...opponents] = await Promise.all([creatorEmail, ...opponentEmails].map(async (email) => {
                const user = await UserModel.getByEmail(email);
    
                if (!user) {
                    throw new ErrorUserDoesNotExist(email);
                }
    
                return user;
            }));
    
            // Create new game
            const game = new GameModel({
                name,
                creatorId: creator.getId(),
                opponentIds: opponents.map(o => o.getId()),
            });
    
            // Keep it in command
            this.game = game;
    
            // Store it in database
            await game.save();
    
            // Create players
            await this.createPlayers([creator, ...opponents]);
    
            // Finish database session
            await session.commitTransaction();
            
            // Report its creation
            logger.info(`New game created: ${game.getId()}`);
    
            return game;

        } catch (e: any) {
            logger.warn(e.message);

            // Revert transaction
            await session.abortTransaction();

            // Pass on error
            throw e;

        } finally {
            await session.endSession();
        }
    }

    private async createPlayers(users: IUser[]) {
        if (!this.game) {
            throw new Error('Cannot create players for an undefined game!');
        }

        // Randomly assign colors to users
        const randomizedColors = shuffle(Object.keys(Color)) as Color[];

        // Create players
        const players = getRange(users.length).map(async (i: number) => {
            const user = users[i];
            const color = randomizedColors[i];

            const player = new PlayerModel({
                gameId: this.game!.getId(),
                userId: user.getId(),
                color,
            });

            await player.save();

            return player;
        });

        return players;
    }
}

export default CreateGameCommand;