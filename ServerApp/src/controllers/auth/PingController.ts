import { RequestHandler } from 'express';
import { successResponse } from '../../libs/calls';

const PingController: RequestHandler = async (req, res, next) => {
    try {
        const { user } = req;

        // Success
        return res.json(successResponse({
            username: user.getUsername(),
            email: user.getEmail(),
            isAdmin: user.isAdmin,
        }));

    } catch (err: any) {
        next(err);
    }
}

export default PingController;