import { RequestHandler } from 'express';
import { successResponse } from '../../utils/calls';
import { logger } from '../../utils/logging';
import { FULL_HAND_JSON } from '../../config/GameConfig';

const GetFullHandController: RequestHandler = async (req, res, next) => {
    try {
        return res.json(successResponse(FULL_HAND_JSON));

    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.warn(err.message);
        }

        next(err);
    }
}

export default GetFullHandController;