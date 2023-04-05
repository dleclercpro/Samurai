import { RequestHandler } from 'express';
import CreateGameCommand from '../../commands/game/CreateGameCommand';
import { successResponse } from '../../libs/calls';

const CreateGameController: RequestHandler = async (req, res, next) => {
    try {
        const { user } = req;
        const { name, opponentEmails } = req.body;

        // Create new game
        const game = await new CreateGameCommand({
            name,
            creatorEmail: user.getEmail(),
            opponentEmails,
        }).execute();

        // Success
        return res.json(successResponse({
            id: game.getId(),
        }));

    } catch (err: any) {
        next(err);
    }
}

export default CreateGameController;