import { RequestHandler } from 'express';
import CreateGameCommand from '../../commands/game/CreateGameCommand';
import { successResponse } from '../../libs/calls';
import { IUser } from '../../models/User';
import { ErrorNotImplementedYet } from '../../errors/ServerError';

const CreateGameController: RequestHandler = async (req, res, next) => {
    try {
        const { user } = req;
        const { name, opponentEmails } = req.body;

        // Extract creator from request
        const creator = user;
        
        // Get opponents from database
        const opponents = [] as IUser[];
        throw new ErrorNotImplementedYet();

        // Create new game
        const game = await new CreateGameCommand({ name, creator, opponents }).execute();

        // Success
        return res.json(successResponse({
            id: game.getId(),
        }));

    } catch (err: any) {
        next(err);
    }
}

export default CreateGameController;