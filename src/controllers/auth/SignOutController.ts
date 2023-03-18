import { RequestHandler } from 'express';
import SignOutCommand from '../../commands/auth/SignOutCommand';
import { SESSION_COOKIE } from '../../config/AuthConfig';
import { ClientError } from '../../errors/ClientErrors';
import { ErrorUserDoesNotExist } from '../../errors/UserErrors';
import { errorResponse, successResponse } from '../../libs/calls';
import { HttpStatusCode } from '../../types/HTTPTypes';
import { logger } from '../../utils/Logging';

const SignOutController: RequestHandler = async (req, res, next) => {
    try {
        const { session } = req;

        await new SignOutCommand({ session }).execute();

        // Remove session cookie in client
        res.clearCookie(SESSION_COOKIE);

        // Success
        return res.json(successResponse());

    } catch (err: any) {
        logger.warn(err.message);

        // Do not tell client why user can't sign out: just say they
        // are unauthorized!
        if (err.code === ErrorUserDoesNotExist.code) {
            return res
                .status(HttpStatusCode.UNAUTHORIZED)
                .json(errorResponse(ClientError.InvalidCredentials));
        }

        next(err);
    }
}

export default SignOutController;