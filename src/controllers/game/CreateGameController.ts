import { RequestHandler } from 'express';
import { database } from '../..';
import CreateGameCommand from '../../commands/game/CreateGameCommand';
import { successResponse } from '../../libs/calls';
import User from '../../models/User';
import { ErrorUserDoesNotExist } from '../../errors/UserErrors';

const CreateGameController: RequestHandler = async (req, res, next) => {
    try {
        const { session } = req;
        const { name, opponentIds } = req.body;

        // Extract creator from session
        const creator = database.getUserById(session.getEmail()) as User;
        
        // Get opponents from database
        const opponents = opponentIds.map((id: string) => {
            const user = database.getUserById(id);
            
            // Ensure opponent exists
            if (!user) {
                throw new ErrorUserDoesNotExist(id);
            }
            
            return user;
         }) as User[];

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