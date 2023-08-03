import { RequestHandler } from 'express';
import SignOutCommand from '../../commands/auth/SignOutCommand';
import { ClientError } from '../../errors/ClientErrors';
import { ErrorUserDoesNotExist } from '../../errors/UserErrors';
import { errorResponse, successResponse } from '../../utils/calls';
import { HttpStatusCode } from '../../types/HTTPTypes';
import { logger } from '../../utils/logging';
import { SESSION_OPTIONS } from '../../config/AuthConfig';

const SignOutController: RequestHandler = async (req, res, next) => {
    try {
        const { cookie } = SESSION_OPTIONS;
        const { session } = req;

        await new SignOutCommand({ session }).execute();

        // Remove session cookie in client
        res.clearCookie(cookie.name);

        // Success
        return res.json(successResponse());

    } catch (err: any) {

        // Do not tell client why user can't sign out: just say they
        // are unauthorized!
        if (err.code === ErrorUserDoesNotExist.code) {
            logger.warn(err.message);
        
            return res
                .status(HttpStatusCode.UNAUTHORIZED)
                .json(errorResponse(ClientError.InvalidCredentials));
        }

        next(err);
    }
}

export default SignOutController;